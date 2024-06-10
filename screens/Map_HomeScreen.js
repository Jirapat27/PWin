import React, { useEffect, useState, useRef } from 'react';
import { View, Image, PermissionsAndroid, Platform, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Dimensions, TextInput, Alert, Linking, BackHandler } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import MapViewStyle from '../MapViewStyle.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { format } from 'date-fns';
import Stars from 'react-native-stars'; // Import the Stars component
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';

import MarkWin from '../images/Win-Mark.png';
import Logo from '../images/Logo.png';
import More from '../images/More.png';
import myCurrentLocation from '../images/myCurrentLocation.png';
import searchIcon from '../images/searchIcon.png';
import clearIcon from '../images/clearIcon.png';
import addPlaceIcon from '../images/Plus.png';
import calPriceIcon from '../images/Price.png';

import CloseButton from '../buttons/CloseButton';
import DynamicAuthButton from '../buttons/DynamicAuthButton';
import HamburgerMenu from '../buttons/HamburgerMenu';

const GOOGLE_MAPS_APIKEY = 'AIzaSyC2PzPPkZ7--zDeI8azWxX4jHkJfQBahFY';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Map_HomeScreen = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [closestMarker, setClosestMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMoreModalVisible, setMoreModalVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentDescription, setCommentDescription] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userUsername, setUserUsername] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); // State to track authentication status
  const [showState, setShowState] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const mapRef = useRef(null);  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const inputRef = useRef(null);
  const clearSearchInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.clear(); // Clear the text input
    }
  };

  const setLocation = (location) => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0148,
        longitudeDelta: 0.0148,
      });
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0148,
            longitudeDelta: 0.0148,
          });
        }
      },
      error => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const handleNearByClick = () => {
    setShowState(!showState);
    toggleRoute();
    getCurrentLocation();
    if (currentLocation && markers.length > 0) {
      findClosestMarker();
      console.log('Have MyLocation' , currentLocation);
      console.log('can find Closest', closestMarker);
    }
  };
  /*------------ calculate distance between two coordinates------------------*/
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  /*----------  find the closest marker to the user's location----------------*/
  const findClosestMarker = () => {
    if (!currentLocation) return;
    let minDistance = Infinity;
    let closestMarker = null;
    markers.forEach((markers) => {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        markers.latitude,
        markers.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestMarker = markers;
        console.log('วินที่ใกล้: ', closestMarker);
      }
    });
    setClosestMarker(closestMarker);
  };

  const toggleRoute = () => {
    setShowRoute(!showRoute); // Toggle the state variable
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location to show it on the map.',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        getCurrentLocation();
      }
    };

    const fetchMarkers = async () => {
      try {
        const ref = database().ref('/MarkWin');
        ref.on('value', snapshot => {
          const data = snapshot.val();
          const markersArray = data
            ? Object.keys(data).map(key => ({
                id: key,
                mid: data[key].mid,
                name: data[key].name,
                latitude: data[key].latitude,
                longitude: data[key].longitude,
                description: data[key].description,
                images: data[key].images,
              }))
            : [];
          setMarkers(markersArray);
        });
      } catch (error) {
        console.error(error);
      }
    };

    const checkAuthentication = async () => {
      const user = auth().currentUser;
      if (user) {
        setAuthenticated(true);
        setUserEmail(user.email);
        const snapshot = await database()
          .ref('/users')
          .orderByChild('email')
          .equalTo(user.email)
          .once('value');
        const userData = snapshot.val();
        if (userData) {
          const userKey = Object.keys(userData)[0];
          setUserProfilePic(userData[userKey].profilePic);
          setUserUsername(userData[userKey].username);
        }
      } else {
        setAuthenticated(false);
      }
    };
    requestLocationPermission();
    fetchMarkers();
    checkAuthentication();
  }, []);

  const fetchComments = async (placeName) => {
    try {
      const commentsSnapshot = await database()
        .ref('/comments')
        .orderByChild('placeName')
        .equalTo(placeName)
        .once('value');
      
      const usersSnapshot = await database().ref('/users').once('value');
      const usersData = usersSnapshot.val();
      const userMapping = Object.keys(usersData).reduce((acc, key) => {
        acc[usersData[key].username] = usersData[key].profilePic;
        return acc;
      }, {});

      const commentsData = commentsSnapshot.val();
      const commentsArray = commentsData
        ? Object.keys(commentsData).map(key => {
            const comment = commentsData[key];
            return {
              id: key,
              description: comment.description,
              starRating: comment.starReview,
              timestamp: new Date(comment.timestamp).getTime(),
              username: comment.username,
              profilePic: userMapping[comment.username],
            };
          })
        : [];

      // Order comments by newest timestamp first
      const sortedComments = commentsArray.sort((a, b) => b.timestamp - a.timestamp);
      setComments(sortedComments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitComment = async () => {
    if (!commentDescription.trim() || starRating === 0) {
      Alert.alert('คำเตือน', 'กรุณากรอกข้อมูลให้ครบทุกช่อง');
      console.log('Description and star rating must be provided.');
      return;
    }
  
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        // Handle scenario where user is not logged in
        console.log('User not logged in.');
        return;
      }
  
      // Retrieve logged-in user's email
      const userEmail = currentUser.email;
  
      // Query the users node to find a user with the same email
      const userSnapshot = await database()
        .ref('/users')
        .orderByChild('email')
        .equalTo(userEmail)
        .once('value');
  
      // If a user with a matching email is found, fetch their username
      const userData = userSnapshot.val();
      const userKey = Object.keys(userData)[0]; // Assuming there's only one user with this email
      const username = userData[userKey].username;
  
      // Format timestamp
      const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

      const newCommentKey = database().ref().child('comments').push().key;
  
      // Push comment data to database with fetched username
      await database().ref('/comments').push({
        cid: newCommentKey,
        placeName: selectedMarker.name,
        mid: selectedMarker.mid,
        username: username,
        description: commentDescription,
        starReview: starRating,
        timestamp: timestamp,
      });
  
      // Clear form fields after submission
      setCommentDescription('');
      setStarRating(0);
  
      // Refresh comments
      fetchComments(selectedMarker.name);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  
const handleMarkerPress = (marker) => {
  setSelectedMarker(marker);
  setModalVisible(true);
  setMoreModalVisible(false);
  fetchComments(marker.name);
};

const closeModal = () => {
  setModalVisible(false);
  setSelectedMarker(null);
  setComments([]);
};

const handleMoreButtonPress = () => {
  setMoreModalVisible(true);
};

const closeMoreModal = () => {
  setMoreModalVisible(false);
};

const handleStartJourney = () => {
  const { latitude, longitude } = currentLocation;
  const destination = selectedMarker;

  if (latitude && longitude && destination) {
    const url = Platform.select({
      ios: `maps://app?saddr=${latitude},${longitude}&daddr=${destination.latitude},${destination.longitude}`,
      android: `google.navigation:q=${destination.latitude},${destination.longitude}`,
    });

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("เกิดข้อผิดพลาด", "Google Maps ยังไม่ได้ติดตั้งบนอุปกรณ์ของคุณ");
      }
    });
  } else {
    Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถรับตำแหน่งหรือจุดหมายปลายทางปัจจุบันของคุณได้");
  }
};

const handleShareLocation = () => {
  const destination = `${selectedMarker.latitude},${selectedMarker.longitude}`;
  const baseUrl = 'https://www.google.com/maps/dir/?api=1';
  const encodedDestination = encodeURIComponent(destination);
  const googleMapsUrl = `${baseUrl}&destination=${encodedDestination}`;
  const copyToClipboard = () => {
    Clipboard.setString(googleMapsUrl);
    Alert.alert('คัดลอกไปยังคลิปบอร์ดแล้ว!', googleMapsUrl);
  };
  copyToClipboard();
  setMoreModalVisible(false);
};
//   `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
//   `https://www.google.com/maps/dir/?api=1=1&query=${coordinates}`;

const handleReportWin = () => {
  if (authenticated) {
    navigation.navigate('ReportWin', { username: userUsername,  placeName: selectedMarker.name, mid: selectedMarker.mid });
    setModalVisible(false);
  } else {
    Alert.alert(
      'ต้องเข้าสู่ระบบก่อน',
      'คุณต้องเข้าสู่ระบบก่อนทำการรายงาน คุณต้องการเข้าสู่ระบบหรือไม่',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'เข้าสู่ระบบ',
          onPress: () => navigation.navigate('Login'),
        },
      ],
      { cancelable: false }
    );
    console.log('User is not authenticated. Please log in.');
  }
};

const handleReportApp = () => {
  if (authenticated) {
    navigation.navigate('ReportApp', { username: userUsername });
  } else {
    Alert.alert(
      'ต้องเข้าสู่ระบบก่อน',
      'คุณต้องเข้าสู่ระบบก่อนทำการรายงาน คุณต้องการเข้าสู่ระบบหรือไม่',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'เข้าสู่ระบบ',
          onPress: () => navigation.navigate('Login'),
        },
      ],
      { cancelable: false }
    );
    console.log('User is not authenticated. Please log in.');
  }
};

const handleLogout = () => {
  auth()
    .signOut()
    .then(() => {
      setUserProfilePic(null);
      setUserEmail(null);
    })
    .catch(error => {
      console.error('Error signing out:', error);
    });
};

const handleCalPricePress = () => {
  navigation.navigate('ChooseDestination');
};

const handleAddPlacePress = () => {
  if (authenticated) {
    navigation.navigate('AddPlace', { username: userUsername });
  } else {
    Alert.alert(
      'ต้องเข้าสู่ระบบก่อน',
      'คุณต้องเข้าสู่ระบบก่อนทำการเพิ่มสถานที่ คุณต้องการเข้าสู่ระบบหรือไม่',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'เข้าสู่ระบบ',
          onPress: () => navigation.navigate('Login'),
        },
      ],
      { cancelable: false }
    );
    console.log('User is not authenticated. Please log in.');
  }
};

useEffect(() => {
  const backAction = () => {
    if (menuOpen) {
      setMenuOpen(false);
      return true;
    }
    return false;
  };

  const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  return () => backHandler.remove();
}, [menuOpen]);

const calculateMeanStarRating = () => {
  if (comments.length === 0) return 0;

  const totalStars = comments.reduce((acc, comment) => acc + comment.starRating, 0);
  return totalStars / comments.length;
};

const meanStarRating = calculateMeanStarRating();

return (
  <View style={{ flex: 1 }}>
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      customMapStyle={MapViewStyle}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: currentLocation ? currentLocation.latitude : 13.0,
        longitude: currentLocation ? currentLocation.longitude : 101.0,
        latitudeDelta: 15.0,
        longitudeDelta: 15.0,
      }}
      showsUserLocation={true}
      showsCompass={false}
      showsMyLocationButton={false}
      toolbarEnabled={false}
    >
      {markers.map(marker => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          image={MarkWin}
          onPress={() => handleMarkerPress(marker)}
        />
      ))}

      {currentLocation && closestMarker && showRoute && (
        <MapViewDirections
          origin={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          destination={{
            latitude: closestMarker.latitude,
            longitude: closestMarker.longitude,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={9}
          strokeColor="#FF9A62"
        />
      )}
    </MapView>
    <View style={styles.menuContainer}>
      <HamburgerMenu isOpen={menuOpen} onPress={toggleMenu} size={30} />
    </View>
      {menuOpen && (
        <TouchableWithoutFeedback onPress={() => setMenuOpen(menuOpen)}>
          <View style={styles.menu}>
            {userEmail && (
              <View style={styles.userInfoContainer}>
                <Image source={{ uri: userProfilePic }} style={styles.userProfilePic} />
                <Text style={styles.userEmail}>{userEmail}</Text>
              </View>
            )}
            <DynamicAuthButton navigation={navigation} onLogout={handleLogout} />
            <TouchableOpacity onPress={() => navigation.navigate('Howto')}>
              <Text style={styles.HowToText}>วิธีใช้</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RateService')}>
              <Text style={styles.RateServiceText}>อัตราการคิดค่าบริการ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReportApp}>
              <Text style={styles.ReportText}>รายงาน</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}
    <View style={styles.logoContainer}>
      <Image source={Logo} style={styles.logo} />
    </View>
    <View style={styles.searchBarContainer}>  
      <GooglePlacesAutocomplete
        ref={inputRef}
        placeholder="ค้นหาสถานที่"
        fetchDetails={true}
        onPress={(data, details = null) => {
          setSearchLocation(details?.geometry?.location);
          // Set the current location to the selected location
          setCurrentLocation({
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
          });
          setLocation(details?.geometry?.location); // Add this line to set the location on the map
        }}
        query={{
          key: 'AIzaSyBNRNzLV-WydX3b96FZOe2rwi4Oe4W5kGg',
          language: 'th',
          components: 'country:th',
        }}
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
          },
          textInput: {
            paddingLeft: windowWidth * 0.111,
            paddingRight: windowWidth * 0.111,
            width: windowWidth * 0.88,
            height: windowHeight * 0.05,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        enablePoweredByContainer={false}
      >
        <Image source={searchIcon} style={[styles.searchIcon, { width: 20, height: 20 }]} />
        <TouchableOpacity onPress={clearSearchInput}>
          <Image source={clearIcon} style={[styles.clearIcon, { width: 20, height: 20 }]} />
        </TouchableOpacity>
      </GooglePlacesAutocomplete>
    </View>
    <View style={styles.MainFunc.Container}>
        <View>
          <TouchableOpacity  onPress={handleCalPricePress}>
            <Image source={calPriceIcon} style={styles.MainFunc.buttons}/>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleAddPlacePress}>
          <Image source={addPlaceIcon} style={styles.MainFunc.buttons}/>
          </TouchableOpacity>
        </View>
    </View>
    <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
      <Image source={myCurrentLocation} style={styles.locationImage} />
    </TouchableOpacity>
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={closeModal}
      style={styles.modal}
    >
      {selectedMarker ? (
        <View style={styles.bottomSheet}>
          <ScrollView Vertical showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.title}>{selectedMarker.name}</Text>
            <Text style={styles.description}>{selectedMarker.description}</Text>
            <View style={styles.rowButton}>
              <TouchableOpacity style={styles.buttonDirec} onPress={handleStartJourney}>
                <Text style={styles.buttonText}>เริ่มเส้นทาง</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonMore} onPress={handleMoreButtonPress}>
                <Image source={More} style={styles.imageMore} />
              </TouchableOpacity>
              <Modal
                isVisible={isMoreModalVisible}
                onBackdropPress={closeMoreModal}
                style={styles.modal}
                onRequestClose={() => setMoreModalVisible(false)}
              >
                <TouchableWithoutFeedback onPress={() => setMoreModalVisible(false)}>
                  <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                      <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={[styles.modalButton]} onPress={handleShareLocation}>
                          <Text style={[styles.blackText]}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton]} onPress={handleReportWin}>
                          <Text style={[styles.blackText]}>Report</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row' }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedMarker.images && selectedMarker.images.map((image, index) => (
                  image && (
                    <TouchableOpacity key={index}>
                      <Image source={{ uri: image }} style={styles.image} />
                    </TouchableOpacity>
                  )
                ))}
              </ScrollView>
            </ScrollView>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewHead}>
                <Text style={styles.review}>รีวิว</Text>
                <View style={styles.reviewRateInfoContainer}>
                <Stars
                  default={meanStarRating} // Pass the meanStarRating value as default prop
                  count={5}
                  half={true}
                  fullStar={require('../images/starFilled.png')}
                  emptyStar={require('../images/starEmpty.png')}
                  halfStar={require('../images/starHalf.png')}
                  starSize={16}
                  disabled={true}
                  style={styles.starRating}
                />
                <View style={styles.ratingInfo}>
                  <Text style={styles.reviewRate}>{meanStarRating.toFixed(1)}</Text>
                  <Text style={styles.reviewCount}>({comments.length})</Text>
                </View>
                </View>
              </View>
              {comments.length > 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ flexDirection: 'row' }}
                >
                  {comments.map((comment, index) => (
                    <View key={index} style={styles.commentContainer}>
                      <View style={styles.commentHeader}>
                        <Image
                          source={{ uri: comment.profilePic }}
                          style={styles.profilePic}
                        />
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={styles.commentUsername}>{comment.username}</Text>
                          <Text style={styles.commentTimestamp}>{new Date(comment.timestamp).toLocaleString()}</Text>
                        </View>
                      </View>
                      <Text style={styles.comment}>{comment.description}</Text>
                      <Stars
                        default={comment.starRating} // Pass the starRating value as default prop
                        count={5}
                        half={true}
                        fullStar={require('../images/starFilled.png')}
                        emptyStar={require('../images/starEmpty.png')}
                        halfStar={require('../images/starHalf.png')}
                        starSize={32}
                        disabled={true} // Disable the stars
                        style={styles.starRatingContainer}
                      />
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text style={styles.noComments}>ยังไม่มีการแสดงความคิดเห็น</Text>
              )}
            </View>
            {userEmail && ( // Only show the comment form if the user is logged in
              <View style={styles.commentFormContainer}>
                <Text style={styles.commentFormLabel}>แสดงความคิดเห็น</Text>
                <TextInput
                  style={styles.commentFormInput}
                  multiline
                  numberOfLines={4}
                  value={commentDescription}
                  onChangeText={setCommentDescription}
                  placeholder="แสดงความคิดเห็นของคุณ..."
                />
                <View style={styles.starRatingContainer}>
                  <Text style={styles.starRatingLabel}>คะแนน:</Text>
                  <Stars
                    default={0}
                    count={5}
                      half={true}
                      fullStar={require('../images/starFilled.png')}
                      emptyStar={require('../images/starEmpty.png')}
                      halfStar={require('../images/starHalf.png')}
                      update={(val)=>setStarRating(val)}
                      starSize={32}
                      style={styles.starRatingContainer}
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.submitButton, { marginRight: 10 }]} onPress={handleSubmitComment}>
                      <Text style={styles.submitButtonText}>ส่ง</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#DDDDDD' }]} onPress={() => {setCommentDescription(''); setStarRating(0);}}>
                      <Text style={[styles.submitButtonText, { color: 'black' }]}>ยกเลิก</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </ScrollView>
            <CloseButton onPress={closeModal} />
          </View>
        ) : (
          <View style={styles.bottomSheet} />
        )}
      </Modal>
      <View style={styles.buttomContainer}>
        <TouchableOpacity style={styles.nearButton.container} onPress={handleNearByClick}>
            <Text style={styles.nearButton.text}>ใกล้ที่สุด</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  menuContainer: {
    position: 'absolute',
    zIndex: 12,
    top: windowHeight * 0.02,
    left: windowWidth * 0.01,
  },
  menu: {
    position: 'absolute',
    zIndex: 11,
    backgroundColor:'white',
    width: windowWidth * 0.75,
    height: windowHeight,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginText: {
    marginTop: 100,
    marginLeft: 75,
    color: '#FF9A62',
    fontSize: 32,
  },
  HowToText: {
    marginTop: 45,
    marginLeft: 25,
    color: 'black',
    fontSize: 24,
  },
  RateServiceText: {
    marginTop: 20,
    marginLeft: 25,
    color: 'black',
    fontSize: 24,
  },
  ReportText: {
    marginTop: 20,
    marginLeft: 25,
    color: 'black',
    fontSize: 24,
  },
  searchBarContainer: {
    position: 'absolute',
    top: windowHeight * 0.089,
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: 10,
  },
  searchIcon: {
    resizeMode: 'contain',
    position: 'absolute',
    top: windowHeight * 0.012,
    left: windowWidth * 0.024,
    alignItems: 'flex-start',
  },
  clearIcon: {
    position: 'absolute',
    bottom: windowHeight * 0.02,
    right: windowWidth * 0.024,
  },
  MainFunc: {
    Container: {
      position: 'absolute',
      left: windowWidth * 0.85,
      top: windowHeight * 0.15,
      zIndex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttons: {
      flexDirection: 'column',
      backgroundColor: '#FF9A62',
      width: 50,
      height: 50,
      borderRadius: 10,
      marginBottom: 10,
    },
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: windowHeight * 0.75,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 26,
    color: 'black',
    marginVertical: 12,
  },
  rowButton: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  buttonDirec: {
    flexDirection: 'column',
    backgroundColor: '#FF9A62',
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 282,
    height: 60,
    marginRight: 6,
  },
  buttonMore: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  modalContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '40%',
    height: '14%',
    alignItems: 'center',
  },
  modalButtonContainer: {
    justifyContent: 'space-between',
    width: '100%',
  },
  modalText: {
    fontSize: 18,
  },
  modalButton: {
    padding: 15,
    borderRadius: 5,
  },
  blackText: {
    color: '#000000',
    fontSize: 20,
  },
  imageMore: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  image: {
    width: windowWidth * 0.89,
    height: windowHeight * 0.4,
    marginRight: 6,
  },
  reviewContainer: {
    backgroundColor: '#FFE6DB',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  reviewHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  review: {
    fontSize: 28,
    fontWeight: 'Semibold',
    color: 'black',
    marginBottom: 10,
    marginRight: 10,
  },
  starRating: {
    marginBottom: 4, // Adjust spacing as needed
    marginLeft: -4, // Adjust spacing as needed
  },
  ratingInfo: {
    flexDirection: 'row',
    marginLeft: 4,
    color: '#8E8E8E',
    marginBottom: 12,
  },
  reviewRate: {
    fontSize: 16, // Adjust font size as needed
    fontWeight: 'medium',
    marginRight: 4, // Adjust spacing as needed
    color: '#000000',
  },
  reviewCount: {
    fontSize: 14, // Adjust font size as needed
  },
  noComments: {
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
  },
  commentContainer: {
    width: 274,
    marginBottom: 10,
    marginRight: 6,
    padding: 20,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
  },
  profilePic: {
    width: windowHeight * 0.06,
    height: windowWidth * 0.12,
    borderRadius: 26,
    marginRight: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#898989',
  },
  comment: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
  },
  commentTimestamp: {
    fontSize: 12,
    color: 'gray',
  },
  commentStarReview: {
    fontSize: 14,
    color: 'gold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  logoContainer: {
    position: 'absolute',
    top: windowHeight * 0.01,
    left: windowWidth * 0.314,
    zIndex: 1,
  },
  logo: {
    width: 150,
    height: 55,
    resizeMode: 'contain',
  },
  buttomContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: windowWidth * 0.025,
    width: '100%',
  },
  locationButton: {
    position: 'absolute',
    bottom: windowWidth * 0.05,
    right: windowWidth * 0.03,
    width: 40,
    height: 40,
    backgroundColor: '#FF9A62',
    borderWidth: 0.33,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  commentFormContainer: {
    marginTop: 20,
  },
  commentFormLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentFormInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  starRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starRatingLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#FF9A62',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nearButton: {
    container: {
      flexDirection: 'column',
      backgroundColor: '#FF9A62',
      padding: 10,
      borderRadius: 20,
      alignItems: 'center',
      width: 125,
      height: 59,
    },
    text: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'semibold',
      fontFamily: 'BaiJamjuree-SemiBold',
    },
  },
  userInfoContainer: {
    position: 'absolute',
    top: windowHeight * 0.02,
    left: windowWidth * 0.16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  userProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userEmail: {
    color: 'black',
    fontSize: 16,
  },
});

export default Map_HomeScreen;
