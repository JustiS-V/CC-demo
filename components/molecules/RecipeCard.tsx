/**
 * RecipeCard Molecule - Recipe card component
 * Consists of Card atom and recipe elements
 */

import { Card, CardProps } from '@/components/atoms/Card';
import { Icon } from '@/components/atoms/Icon';
import { Caption, Text } from '@/components/atoms/Text';
import { ThemedView } from '@/components/themed-view';
import { Sizes } from '@/constants/styles/spacing';
import { Colors, RecipeCategoryColors } from '@/constants/theme/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet } from 'react-native';

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image?: string;
  cookingTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  category: keyof typeof RecipeCategoryColors;
  rating?: number;
  author?: string;
  isFavorite?: boolean;
}

export interface RecipeCardProps extends Omit<CardProps, 'children'> {
  /** Recipe data */
  recipe: Recipe;
  /** Card press handler */
  onPress?: (recipe: Recipe) => void;
  /** Toggle favorite handler */
  onToggleFavorite?: (recipe: Recipe) => void;
  /** Show favorite button */
  showFavoriteButton?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onPress,
  onToggleFavorite,
  showFavoriteButton = true,
  ...cardProps
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = () => {
    onPress?.(recipe);
  };

  const handleFavoritePress = () => {
    onToggleFavorite?.(recipe);
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Easy';
      case 'medium':
        return 'Medium';
      case 'hard':
        return 'Hard';
      default:
        return 'Unknown';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return colors.success;
      case 'medium':
        return colors.warning;
      case 'hard':
        return colors.error;
      default:
        return colors.muted;
    }
  };

  return (
    <Card
      {...cardProps}
      pressable={!!onPress}
      onPress={handlePress}
      style={[styles.card, cardProps.style]}
    >
      {/* Recipe image */}
      <ThemedView style={styles.imageContainer}>
        {recipe.image ? (
          <ThemedText style={styles.imagePlaceholder}>
            🍳
          </ThemedText>
        ) : (
          <ThemedText style={styles.imagePlaceholder}>
            🍽️
          </ThemedText>
        )}
        
        {/* Favorite button */}
        {showFavoriteButton && (
          <ThemedView style={styles.favoriteButton}>
            <Icon
              name={recipe.isFavorite ? 'heart' : 'heart'}
              size={20}
              color={recipe.isFavorite ? colors.error : colors.icon}
              onPress={handleFavoritePress}
            />
          </ThemedView>
        )}
        
        {/* Category */}
        <ThemedView 
          style={[
            styles.categoryBadge,
            { backgroundColor: RecipeCategoryColors[recipe.category] + '20' }
          ]}
        >
          <Text size="xs" color="muted">
            {recipe.category}
          </Text>
        </ThemedView>
      </ThemedView>

      {/* Card content */}
      <ThemedView style={styles.content}>
        {/* Title */}
        <Text variant="h4" numberOfLines={2} style={styles.title}>
          {recipe.title}
        </Text>

        {/* Description */}
        {recipe.description && (
          <BodySmall color="muted" numberOfLines={2} style={styles.description}>
            {recipe.description}
          </BodySmall>
        )}

        {/* Metadata */}
        <ThemedView style={styles.meta}>
          {/* Cooking time */}
          <ThemedView style={styles.metaItem}>
            <Icon
              name="timer"
              size={14}
              color={colors.icon}
            />
            <Caption color="muted">
              {recipe.cookingTime} min
            </Caption>
          </ThemedView>

          {/* Difficulty */}
          <ThemedView style={styles.metaItem}>
            <Icon
              name="star"
              size={14}
              color={getDifficultyColor(recipe.difficulty)}
            />
            <Caption color="muted">
              {getDifficultyText(recipe.difficulty)}
            </Caption>
          </ThemedView>

          {/* Rating */}
          {recipe.rating && (
            <ThemedView style={styles.metaItem}>
              <Icon
                name="star"
                size={14}
                color={colors.warning}
              />
              <Caption color="muted">
                {recipe.rating.toFixed(1)}
              </Caption>
            </ThemedView>
          )}
        </ThemedView>

        {/* Author */}
        {recipe.author && (
          <Caption color="muted" style={styles.author}>
            Author: {recipe.author}
          </Caption>
        )}
      </ThemedView>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Sizes.md,
  },
  
  imageContainer: {
    height: 120,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: Sizes.sm,
  },
  
  imagePlaceholder: {
    fontSize: 48,
  },
  
  favoriteButton: {
    position: 'absolute',
    top: Sizes.sm,
    right: Sizes.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: Sizes.xs,
  },
  
  categoryBadge: {
    position: 'absolute',
    top: Sizes.sm,
    left: Sizes.sm,
    paddingHorizontal: Sizes.sm,
    paddingVertical: Sizes.xs,
    borderRadius: 12,
  },
  
  content: {
    flex: 1,
  },
  
  title: {
    marginBottom: Sizes.xs,
  },
  
  description: {
    marginBottom: Sizes.sm,
  },
  
  meta: {
    flexDirection: 'row',
    gap: Sizes.md,
    marginBottom: Sizes.sm,
  },
  
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.xs,
  },
  
  author: {
    fontStyle: 'italic',
  },
});
