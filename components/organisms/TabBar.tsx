/**
 * TabBar Organism - Bottom navigation panel
 * Complex component for tab navigation
 */

import type React from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';

import { TabButton } from '@/components/molecules/TabButton';
import { ThemedView } from '@/components/themed-view';
import { ComponentHeights, Shadows, Sizes } from '@/constants/styles/spacing';
import { Colors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface TabItem {
  /** Unique tab key */
  key: string;
  /** Tab icon */
  icon: string;
  /** Tab text */
  label: string;
  /** Is tab active */
  active?: boolean;
  /** Show badge */
  badge?: string | number;
  /** Is tab disabled */
  disabled?: boolean;
}

export interface TabBarProps {
  /** Tab items */
  tabs: TabItem[];
  /** Active tab */
  activeTab?: string;
  /** Tab change handler */
  onTabChange?: (tabKey: string) => void;
  /** Show center button */
  showCenterButton?: boolean;
  /** Center button icon */
  centerButtonIcon?: string;
  /** Center button handler */
  onCenterButtonPress?: () => void;
  /** Container for styling */
  containerStyle?: ViewStyle;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  showCenterButton = false,
  centerButtonIcon = 'plus',
  onCenterButtonPress,
  containerStyle,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleTabPress = (tabKey: string) => {
    onTabChange?.(tabKey);
  };

  return (
    <ThemedView style={[styles.container, containerStyle]}>
      <ThemedView
        style={[styles.tabBar, { backgroundColor: colors.background }]}
      >
        {tabs.map(tab => (
          <TabButton
            key={tab.key}
            icon={tab.icon}
            label={tab.label}
            active={tab.key === activeTab}
            badge={tab.badge}
            disabled={tab.disabled}
            onPress={() => handleTabPress(tab.key)}
            style={styles.tabButton}
          />
        ))}

        {showCenterButton && (
          <ThemedView style={styles.centerButtonContainer}>
            <TabButton
              icon={centerButtonIcon}
              iconOnly
              onPress={onCenterButtonPress}
              style={[styles.centerButton, { backgroundColor: colors.primary }]}
            />
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: ComponentHeights.tabBar,
    paddingHorizontal: Sizes.sm,
    paddingBottom: Sizes.md,
    paddingTop: Sizes.sm,
    ...Shadows.lg,
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
  },

  centerButtonContainer: {
    position: 'absolute',
    top: -20,
    left: '50%',
    marginLeft: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.xl,
  },

  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
