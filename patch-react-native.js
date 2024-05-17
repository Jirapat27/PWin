const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules/react-native/index.js');
const fileContent = fs.readFileSync(filePath, 'utf8');

const updatedContent = fileContent.replace(
  /get ColorPropType\(\): \$FlowFixMe {[^}]*}/,
  `get ColorPropType(): $FlowFixMe {
    return require('deprecated-react-native-prop-types').ColorPropType;
  }`
).replace(
  /get EdgeInsetsPropType\(\): \$FlowFixMe {[^}]*}/,
  `get EdgeInsetsPropType(): $FlowFixMe {
    return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
  }`
).replace(
  /get PointPropType\(\): \$FlowFixMe {[^}]*}/,
  `get PointPropType(): $FlowFixMe {
    return require('deprecated-react-native-prop-types').PointPropType;
  }`
).replace(
  /get ViewPropTypes\(\): \$FlowFixMe {[^}]*}/,
  `get ViewPropTypes(): $FlowFixMe {
    return require('deprecated-react-native-prop-types').ViewPropTypes;
  }`
);

fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('Patched react-native prop types with deprecated-react-native-prop-types.');
