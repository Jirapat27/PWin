import { useState, useContext } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { auth, db, databaseRef, onValue, off } from '../Config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { withRouter } from 'react-router-dom';
import { EmailContext } from '../EmailContext'; // Import the EmailContext

const Login = ({ history }) => {
  const { setEmail } = useContext(EmailContext); // Use the EmailContext
  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Successfully logged in:', userCredential.user.email);
  
        const userRef = databaseRef(db, `users/${userCredential.user.uid}`);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.status === 'admin') {
            setEmail(userCredential.user.email); // Set the email in context
            history.push('/home');
            // Show success message
            window.alert('เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ');
          } else {
            alert('คุณไม่ใช่ admin');
          }
        }, (error) => {
          console.error('Error reading user data:', error);
          alert('เกิดข้อผิดพลาดในการตรวจสอบสถานะผู้ใช้');
        });
  
        // Cleanup the onValue listener
        return () => {
          off(userRef);
        };
      })
      .catch((error) => {
        console.log('Error logging in:', error.message);
        if (error.code === 'auth/user-not-found') { // Check if user not found
          window.alert('ไม่พบบัญชีของคุณ'); // Show error message
        } else {
          alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500">
          P'Win's Admin Login
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 mt-4 rounded-md bg-gray-200 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 mt-4 rounded-md bg-gray-200 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={handleVisible}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={handleVisible}
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[50px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-orange-500 hover:bg-orange-700"
                onClick={handleSubmit}
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
