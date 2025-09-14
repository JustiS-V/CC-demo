import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function RecipesScreen() {
  const colorScheme = useColorScheme();

  const categories = [
    { id: 1, name: 'Breakfast', icon: 'sun.max.fill', color: '#FFD700' },
    { id: 2, name: 'Lunch', icon: 'sun.max.fill', color: '#FF6B6B' },
    { id: 3, name: 'Dinner', icon: 'moon.fill', color: '#4ECDC4' },
    { id: 4, name: 'Desserts', icon: 'heart.fill', color: '#FF9FF3' },
    { id: 5, name: 'Drinks', icon: 'drop.fill', color: '#54A0FF' },
    { id: 6, name: 'Snacks', icon: 'leaf.fill', color: '#5F27CD' },
  ];

  const popularRecipes = [
    {
      id: 1,
      title: 'Carbonara Pasta',
      time: '20 min',
      difficulty: 'Medium',
      image: '🍝',
    },
    {
      id: 2,
      title: 'Caesar Salad',
      time: '15 min',
      difficulty: 'Easy',
      image: '🥗',
    },
    {
      id: 3,
      title: 'Tiramisu',
      time: '45 min',
      difficulty: 'Hard',
      image: '🍰',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Recipe Catalog
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Find the perfect recipe for any occasion
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Categories
        </ThemedText>
        <ThemedView style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                { backgroundColor: category.color + '20' },
              ]}
              onPress={() => Alert.alert(category.name, `Open category: ${category.name}`)}
            >
              <IconSymbol name={category.icon} size={32} color={category.color} />
              <ThemedText style={styles.categoryName}>
                {category.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Popular Recipes
        </ThemedText>
        {popularRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={[
              styles.recipeCard,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                borderColor: Colors[colorScheme ?? 'light'].border,
              },
            ]}
            onPress={() => Alert.alert(recipe.title, `Open recipe: ${recipe.title}`)}
          >
            <ThemedText style={styles.recipeEmoji}>
              {recipe.image}
            </ThemedText>
            <ThemedView style={styles.recipeInfo}>
              <ThemedText style={styles.recipeTitle}>
                {recipe.title}
              </ThemedText>
              <ThemedView style={styles.recipeMeta}>
                <ThemedView style={styles.recipeMetaItem}>
                  <IconSymbol name="clock" size={14} color={Colors[colorScheme ?? 'light'].tabIconDefault} />
                  <ThemedText style={styles.recipeMetaText}>
                    {recipe.time}
                  </ThemedText>
                </ThemedView>
                <ThemedView style={styles.recipeMetaItem}>
                  <IconSymbol name="star.fill" size={14} color={Colors[colorScheme ?? 'light'].tabIconDefault} />
                  <ThemedText style={styles.recipeMetaText}>
                    {recipe.difficulty}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            <IconSymbol
              name="chevron.right"
              size={16}
              color={Colors[colorScheme ?? 'light'].tabIconDefault}
            />
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  recipeEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  recipeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recipeMetaText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
