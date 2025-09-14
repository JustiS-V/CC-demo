import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I can help you create a new recipe. What would you like to cook?',
      isBot: true,
    },
  ]);
  const colorScheme = useColorScheme();

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        isBot: false,
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Bot response simulation
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: 'Great idea! Here\'s a recipe for you:\n\n🍳 Simple Recipe\n\nIngredients:\n- Main ingredient\n- Spices\n- Oil\n\nInstructions:\n1. Prepare ingredients\n2. Heat the pan\n3. Cook until ready\n\nEnjoy your meal!',
          isBot: true,
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Recipe Generator
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Create a new recipe with AI
        </ThemedText>
      </ThemedView>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <ThemedView
            key={msg.id}
            style={[
              styles.message,
              msg.isBot ? styles.botMessage : styles.userMessage,
            ]}
          >
            <ThemedText
              style={[
                styles.messageText,
                msg.isBot ? styles.botMessageText : styles.userMessageText,
              ]}
            >
              {msg.text}
            </ThemedText>
          </ThemedView>
        ))}
      </ScrollView>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: Colors[colorScheme ?? 'light'].background,
              color: Colors[colorScheme ?? 'light'].text,
              borderColor: Colors[colorScheme ?? 'light'].border,
            },
          ]}
          placeholder="Describe the recipe you want to create..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: Colors[colorScheme ?? 'light'].tint },
          ]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <IconSymbol name="paperplane.fill" size={20} color="white" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
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
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  message: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botMessageText: {
    color: '#000',
  },
  userMessageText: {
    color: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 30,
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
