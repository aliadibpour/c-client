import Svg, { Path } from "react-native-svg";

export const HouseIcon = ({ color = "white", size = 24 }) => {
    return(
        <Svg width={size} height={size} fill={color} viewBox="0 0 24 24">
            <Path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd"/>
        </Svg>
    )
}

export const SearchIcon = ({ color = "white", size = 24 }) => {
    return (
        <Svg width={size} height={size} fill={color} viewBox="0 0 24 24">
            <Path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"/>
            <Path fillRule="evenodd" d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z" clipRule="evenodd"/>
        </Svg>
    )
}

export const TelegramIcon = ({ color = "white", size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
      <Path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
    </Svg>
);

export const ProfileIcon = ({ color = "white", size = 24 }) => {
    return (
        <Svg width={size} height={size} fill={color} viewBox="0 0 16 16">
            <Path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        </Svg>
    )
}
