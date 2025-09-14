/**
 * SearchBar Molecule - Search component
 * Consists of Input atom and additional functionality
 */

import type React from 'react';
import { useState } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';

import { Button } from '@/components/atoms/Button';
import { Input, type InputProps } from '@/components/atoms/Input';
import { ThemedView } from '@/components/themed-view';
import { Sizes } from '@/constants/styles/spacing';

export interface SearchBarProps extends Omit<InputProps, 'rightIcon'> {
  /** Show search button */
  showSearchButton?: boolean;
  /** Show clear button */
  showClearButton?: boolean;
  /** Search button text */
  searchButtonText?: string;
  /** Search handler */
  onSearch?: (query: string) => void;
  /** Clear handler */
  onClear?: () => void;
  /** Debounce delay in ms */
  debounceMs?: number;
  /** Container for styling */
  containerStyle?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  showSearchButton = false,
  showClearButton = true,
  searchButtonText = 'Search',
  onSearch,
  onClear,
  debounceMs = 300,
  containerStyle,
  value,
  onChangeText,
  ...inputProps
}) => {
  const [searchQuery, setSearchQuery] = useState(value || '');

  const handleTextChange = (text: string) => {
    setSearchQuery(text);
    onChangeText?.(text);

    // Debounce for automatic search
    if (onSearch && debounceMs > 0) {
      setTimeout(() => {
        onSearch(text);
      }, debounceMs);
    }
  };

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onChangeText?.('');
    onClear?.();
  };

  const getRightIcon = () => {
    if (showClearButton && searchQuery.length > 0) {
      return 'xmark.circle.fill';
    }
    return inputProps.rightIcon;
  };

  return (
    <ThemedView style={[styles.container, containerStyle]}>
      <Input
        {...inputProps}
        value={searchQuery}
        onChangeText={handleTextChange}
        rightIcon={getRightIcon()}
        containerStyle={styles.inputContainer}
      />

      {showSearchButton && (
        <Button
          size="md"
          variant="primary"
          onPress={handleSearch}
          style={styles.searchButton}
        >
          {searchButtonText}
        </Button>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Sizes.sm,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 0,
  },
  searchButton: {
    minWidth: 80,
  },
});
