import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { IconShape, BackplateStyle } from '../../types/theme';

interface ThemedIconProps {
  name: string;
  size?: number; // base size in px (defaults to 24 * iconScale)
  className?: string;
  forceShape?: IconShape;
  forceBackplate?: BackplateStyle;
  colorOverride?: string;
  showBackplate?: boolean;
}

export const ThemedIcon: React.FC<ThemedIconProps> = ({
  name,
  size = 24,
  className = '',
  forceShape,
  forceBackplate,
  colorOverride,
  showBackplate = true
}) => {
  const { config, tokens } = useTheme();

  // Resolve icon component dynamically from Lucide
  const IconComponent = (LucideIcons as Record<string, any>)[name] || LucideIcons.Sparkles;

  const actualSize = Math.round(size * config.iconScale);
  const strokeWidth = config.iconStrokeWidth;
  const iconPack = config.iconPack;
  const shape = forceShape || config.iconShape;
  const backplate = forceBackplate || config.iconBackplate;

  // Colors
  const primaryColor = colorOverride || tokens.primary;
  const secondaryColor = tokens.secondary;
  const isDark = config.isDark;

  // Shape class for backplate
  const getShapeStyle = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'squircle':
        return 'rounded-[26%]';
      case 'rounded':
        return 'rounded-xl';
      case 'sharp':
        return 'rounded-xs';
      case 'hex':
        return 'rounded-md [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]';
      default:
        return 'rounded-xl';
    }
  };

  // Backplate background & border styling
  const getBackplateStyle = () => {
    if (!showBackplate || backplate === 'none') {
      return {
        container: 'bg-transparent border-transparent',
        inlineStyle: {}
      };
    }

    switch (backplate) {
      case 'glass':
        return {
          container: 'backdrop-blur-md border shadow-xs transition-transform duration-200',
          inlineStyle: {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.65)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
            boxShadow: isDark 
              ? `0 4px 14px -2px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.15)`
              : `0 4px 12px -2px rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.8)`
          }
        };
      case 'subtle':
        return {
          container: 'border transition-all duration-200',
          inlineStyle: {
            backgroundColor: isDark ? `${primaryColor}18` : `${primaryColor}14`,
            borderColor: isDark ? `${primaryColor}30` : `${primaryColor}22`
          }
        };
      case 'solid':
        return {
          container: 'shadow-sm border transition-all duration-200',
          inlineStyle: {
            backgroundColor: isDark ? tokens.card : '#ffffff',
            borderColor: tokens.border,
            boxShadow: isDark
              ? '0 2px 8px rgba(0,0,0,0.4)'
              : '0 2px 6px rgba(0,0,0,0.05)'
          }
        };
      case 'gradient':
        return {
          container: 'border shadow-md transition-all duration-200',
          inlineStyle: {
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            borderColor: 'rgba(255, 255, 255, 0.25)',
            boxShadow: `0 4px 12px ${primaryColor}33`
          }
        };
      default:
        return {
          container: 'bg-transparent border-transparent',
          inlineStyle: {}
        };
    }
  };

  const { container: bpContainer, inlineStyle: bpStyle } = getBackplateStyle();
  const shapeClass = getShapeStyle();

  // Container dimensions
  const containerPadding = Math.max(6, Math.round(actualSize * 0.35));
  const containerSize = actualSize + containerPadding * 2;

  // Specific Icon Rendering based on Icon Pack
  const renderGlyph = () => {
    switch (iconPack) {
      case 'duotone':
        return (
          <IconComponent
            size={actualSize}
            strokeWidth={strokeWidth}
            color={primaryColor}
            fill={secondaryColor}
            fillOpacity={0.28}
            className="transition-all duration-200"
          />
        );

      case 'solid':
        // Bold filled representation
        return (
          <IconComponent
            size={actualSize}
            strokeWidth={strokeWidth}
            color={backplate === 'gradient' ? '#ffffff' : primaryColor}
            fill={backplate === 'gradient' ? '#ffffff' : primaryColor}
            fillOpacity={0.88}
            className="transition-all duration-200"
          />
        );

      case 'cyber':
        return (
          <div className="relative flex items-center justify-center">
            <IconComponent
              size={actualSize}
              strokeWidth={strokeWidth}
              color={primaryColor}
              className="drop-shadow-[0_0_6px_var(--sys-primary)] transition-all duration-200"
            />
          </div>
        );

      case 'papercraft':
        return (
          <div className="relative flex items-center justify-center">
            <IconComponent
              size={actualSize}
              strokeWidth={strokeWidth}
              color={primaryColor}
              className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.22)] transition-all duration-200"
            />
          </div>
        );

      case 'squircle':
        return (
          <IconComponent
            size={actualSize}
            strokeWidth={strokeWidth}
            color={backplate === 'gradient' ? '#ffffff' : primaryColor}
            className="transition-all duration-200"
          />
        );

      case 'linear':
      default:
        return (
          <IconComponent
            size={actualSize}
            strokeWidth={strokeWidth}
            color={backplate === 'gradient' ? '#ffffff' : primaryColor}
            className="transition-all duration-200"
          />
        );
    }
  };

  // If backplate is none or disabled, render compact glyph
  if (!showBackplate || backplate === 'none') {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        {renderGlyph()}
      </span>
    );
  }

  return (
    <div
      style={{
        width: `${containerSize}px`,
        height: `${containerSize}px`,
        ...bpStyle
      }}
      className={`inline-flex items-center justify-center shrink-0 ${shapeClass} ${bpContainer} ${className}`}
    >
      {renderGlyph()}
    </div>
  );
};
