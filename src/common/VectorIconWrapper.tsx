import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const getIconComponent = (library: string) => {
  switch (library) {
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    case 'SimpleLineIcons':
      return SimpleLineIcons;
    case 'MaterialIcons':
      return MaterialIcons;
    case 'FontAwesome':
      return FontAwesome;
    case 'Foundation':
      return Foundation;
    case 'EvilIcons':
      return EvilIcons;
    case 'Octicons':
      return Octicons;
    case 'Ionicons':
      return Ionicons;
    case 'Feather':
      return Feather;
    case 'Entypo':
      return Entypo;
    case 'Zocial':
      return Zocial;
    case 'AntDesign':
      return AntDesign;
    case 'FontAwesome5':
      return FontAwesome5;
    default:
      return null;
  }
};

interface IProps {
  type:
    | 'MaterialCommunityIcons'
    | 'SimpleLineIcons'
    | 'MaterialIcons'
    | 'FontAwesome'
    | 'Foundation'
    | 'EvilIcons'
    | 'Octicons'
    | 'Ionicons'
    | 'Feather'
    | 'Entypo'
    | 'Zocial'
    | 'AntDesign'
    | 'FontAwesome5';
  name: string;
  color: string;
  size: number;
  style?: any;
}

export const VectorIcon = (props: IProps) => {
  const {color, name, size, type, style = {}} = props;
  const IconComponent = getIconComponent(type);

  if (!IconComponent) {
    console.error(`Unsupported icon library: ${type}`);
    return null;
  }

  return <IconComponent name={name} size={size} color={color} style={style} />;
};
