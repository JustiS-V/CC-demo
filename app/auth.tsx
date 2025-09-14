import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function AuthScreen() {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const colorScheme = useColorScheme();
  const { signIn, signUp, signInWithPhone } = useAuth();
  const { t } = useLanguage();

  const isEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const isPhoneNumber = (text: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(text.replace(/\s/g, ''));
  };

  const getInputType = (text: string) => {
    if (isEmail(text)) return 'email';
    if (isPhoneNumber(text)) return 'phone';
    return 'unknown';
  };

  const handleAuth = async () => {
    if (!input.trim()) {
      Alert.alert(t('common.error'), t('auth.pleaseEnterEmailOrPhone'));
      return;
    }

    const inputType = getInputType(input);
    
    if (inputType === 'unknown') {
      Alert.alert(t('common.error'), t('auth.pleaseEnterValidEmailOrPhone'));
      return;
    }

    setIsLoading(true);

    try {
      if (inputType === 'phone') {
        // Phone number authentication
        const verificationId = await signInWithPhone(input);
        router.push({
          pathname: '/verify-code',
          params: {
            contact: input,
            type: inputType,
            verificationId: verificationId,
          },
        });
      } else {
        // Email authentication
        if (!password.trim()) {
          Alert.alert(t('common.error'), t('auth.pleaseEnterPassword'));
          setIsLoading(false);
          return;
        }

        if (isSignUp) {
          await signUp(input, password);
        } else {
          await signIn(input, password);
        }
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputType = getInputType(input);
  const placeholder = inputType === 'email' 
    ? t('auth.enterEmail') 
    : inputType === 'phone' 
    ? t('auth.enterPhone') 
    : t('auth.pleaseEnterEmailOrPhone');

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.header}>
          <ThemedView style={styles.logoContainer}>
            <IconSymbol name="fork.knife" size={60} color={Colors[colorScheme ?? 'light'].tint} />
          </ThemedView>
          <ThemedText type="title" style={styles.title}>
            {t('auth.welcome')}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {isSignUp ? t('auth.createAccountToSave') : t('auth.signInToAccount')}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedView style={styles.inputContainer}>
            <ThemedView style={styles.inputWrapper}>
              <IconSymbol 
                name={inputType === 'email' ? 'envelope.fill' : 'phone.fill'} 
                size={20} 
                color={Colors[colorScheme ?? 'light'].tabIconDefault} 
              />
              <TextInput
                style={[
                  styles.textInput,
                  {
                    color: Colors[colorScheme ?? 'light'].text,
                  },
                ]}
                placeholder={placeholder}
                placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
                value={input}
                onChangeText={setInput}
                keyboardType={inputType === 'email' ? 'email-address' : 'phone-pad'}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </ThemedView>
            
            {inputType === 'email' && (
              <ThemedView style={styles.passwordContainer}>
                <ThemedView style={styles.inputWrapper}>
                  <IconSymbol 
                    name="lock.fill" 
                    size={20} 
                    color={Colors[colorScheme ?? 'light'].tabIconDefault} 
                  />
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        color: Colors[colorScheme ?? 'light'].text,
                      },
                    ]}
                    placeholder={t('auth.enterPassword')}
                    placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </ThemedView>
              </ThemedView>
            )}
            
            {inputType !== 'unknown' && (
              <ThemedView style={styles.inputHint}>
                <IconSymbol name="checkmark.circle.fill" size={16} color="#4CAF50" />
                <ThemedText style={styles.hintText}>
                  {inputType === 'email' 
                    ? t('auth.emailAuth') 
                    : t('auth.phoneAuth')
                  }
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>

          <TouchableOpacity
            style={[
              styles.authButton,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].tint,
                opacity: isLoading ? 0.7 : 1,
              },
            ]}
            onPress={handleAuth}
            disabled={isLoading || inputType === 'unknown' || (inputType === 'email' && !password.trim())}
          >
            {isLoading ? (
              <ThemedText style={styles.buttonText}>
                {inputType === 'phone' ? t('auth.sending') : t('auth.signingIn')}
              </ThemedText>
            ) : (
              <>
                <IconSymbol name="paperplane.fill" size={20} color="white" />
                <ThemedText style={styles.buttonText}>
                  {inputType === 'phone' ? t('auth.resendCode') : (isSignUp ? t('auth.signUp') : t('auth.signIn')}
                </ThemedText>
              </>
            )}
          </TouchableOpacity>

          {inputType === 'email' && (
            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsSignUp(!isSignUp)}
            >
              <ThemedText style={styles.switchText}>
                {isSignUp ? t('auth.alreadyHaveAccount') : t('auth.dontHaveAccount')}
              </ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>

        <ThemedView style={styles.footer}>
          <ThemedText style={styles.footerText}>
            {t('auth.termsOfUse')}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    gap: 12,
  },
  passwordContainer: {
    marginTop: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  inputHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#4CAF50',
    flex: 1,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 16,
  },
});
