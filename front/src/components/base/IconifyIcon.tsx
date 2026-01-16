import { useId } from 'react';
import { Icon, IconProps } from '@iconify/react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { registerIcons } from 'lib/iconify/iconify-register';

interface IconifyProps extends Omit<IconProps, 'color'> {
  sx?: SxProps<Theme>;
  flipOnRTL?: boolean;
  icon: string;
  color?: string;
  size?: number;
}

// Original Iconify (for existing MUI usage, keeps baseline/spacing)
export const IconifyIcon = ({ icon, flipOnRTL = false, color, sx, size, ...rest }: IconifyProps) => {
  const uniqueId = useId();
  registerIcons();

  return (
    <Box
      component={Icon}
      className="iconify"
      sx={[
        flipOnRTL && { transform: (theme) => (theme.direction === 'rtl' ? 'scaleX(-1)' : 'none') },
        { verticalAlign: 'baseline' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      width={size}
      height={size}
      {...(rest as any)}
      icon={icon}
      id={uniqueId}
      color={color}
      ssr
    />
  );
};

// Tight Iconify (no padding/margin, perfect for inline with text)
export const IconifySecond = ({ icon, color, size = 20, ...rest }: IconifyProps) => {
  const uniqueId = useId();
  registerIcons();

  return (
    <Icon
      icon={icon}
      id={uniqueId}
      color={color}
      width={size}
      height={size}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        margin: 0,
        padding: 0,
        lineHeight: 0, // removes SVG extra spacing
      }}
      {...rest}
    />
  );
};

// Default export keeps old usage safe
export default IconifyIcon;
