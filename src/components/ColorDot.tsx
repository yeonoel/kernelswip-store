import { getColorHex } from "../lib/constants";

export function ColorDot({ color, selected, onClick, size = 'sm' }: { color: string; selected?: boolean; onClick?: () => void; size?: 'sm' | 'md' }) {
    const hex = getColorHex(color);
    const isLight = ['white', 'blanc', 'beige', 'yellow', 'jaune'].includes(color.toLowerCase());
    const dim = size === 'md' ? 'w-7 h-7' : 'w-5 h-5';
    return (
        <button
            onClick={onClick}
            title={color}
            style={{ backgroundColor: hex }}
            className={`${dim} rounded-full border-2 transition-all duration-200 ${selected ? 'border-orange-500 scale-110 shadow-lg' : isLight ? 'border-gray-300' : 'border-transparent'} ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
        />
    );
}
