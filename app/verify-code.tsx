import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function VerifyCodeScreen() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<TextInput[]>([]);
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  const { verifyPhoneCode } = useAuth();
  const { t } = useLanguage();
  
  const contact = params.contact as string;
  const type = params.type as string;
  const verificationId = params.verificationId as string;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next field
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      Alert.alert(t('common.error'), t('auth.pleaseEnterCompleteCode'));
      return;
    }

    setIsLoading(true);

    try {
      if (type === 'phone' && verificationId) {
        // Phone code verification via Firebase
        await verifyPhoneCode(verificationId, fullCode);
      } else {
        // For email, simulation for now
        await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert(t('common.success'), t('auth.codeVerified'));
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      Alert.alert(t('common.error'), error.message || t('auth.invalidCode'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setTimeLeft(60);
    
    try {
      // Code resend simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert(t('common.success'), t('auth.newCodeSent') + ' ' + (type === 'email' ? 'email' : 'phone number'));
    } catch (error) {
      Alert.alert(t('common.error'), t('errors.tryAgain'));
    } finally {
      setIsLoading(false);
    }
  };

  const formatContact = (contact: string, type: string) => {
    if (type === 'email') return contact;
    // Mask phone number for security
    return contact.replace(/(\d{3})\d{3}(\d{2})(\d{2})/, '+$1***$2$3');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.left" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
          
          <ThemedView style={styles.logoContainer}>
            <IconSymbol name="checkmark.shield.fill" size={40} color={Colors[colorScheme ?? 'light'].tint} />
          </ThemedView>
          
          <ThemedText type="title" style={styles.title}>
            Verify Code
          </ThemedText>
          
          <ThemedText style={styles.subtitle}>
            We sent a code to {formatContact(contact, type)}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedView style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[
                  styles.codeInput,
                  {
                    borderColor: digit ? Colors[colorScheme ?? 'light'].tint : '#E0E0E0',
                    color: Colors[colorScheme ?? 'light'].text,
                  },
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
              />
            ))}
          </ThemedView>

          <TouchableOpacity
            style={[
              styles.verifyButton,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].tint,
                opacity: isLoading ? 0.7 : 1,
              },
            ]}
            onPress={handleVerifyCode}
            disabled={isLoading || code.some(digit => !digit)}
          >
            {isLoading ? (
              <ThemedText style={styles.buttonText}>{t('auth.verifying')}</ThemedText>
            ) : (
              <>
                <IconSymbol name="checkmark.circle.fill" size={20} color="white" />
                <ThemedText style={styles.buttonText}>{t('auth.verifyCode')}</ThemedText>
              </>
            )}
          </TouchableOpacity>

          <ThemedView style={styles.resendContainer}>
            <ThemedText style={styles.resendText}>
              {t('auth.didntReceiveCode')}{' '}
            </ThemedText>
            <TouchableOpacity
              onPress={handleResendCode}
              disabled={timeLeft > 0 || isLoading}
            >
              <ThemedText style={[
                styles.resendButton,
                { 
                  color: timeLeft > 0 ? Colors[colorScheme ?? 'light'].tabIconDefault : Colors[colorScheme ?? 'light'].tint,
                }
              ]}>
                {timeLeft > 0 ? `${t('auth.resendCode')} (${timeLeft}s)` : t('auth.resendCode')}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <IconSymbol name="chevron.left" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
          
          <ThemedView style={styles.logoContainer}>
            <IconSymbol name="checkmark.shield.fill" size={40} color={Colors[colorScheme ?? 'light'].tint} />
          </ThemedView>
          
          <ThemedText type="title" style={styles.title}>
            Verify Code
          </ThemedText>
          
          <ThemedText style={styles.subtitle}>
            We sent a code to {formatContact(contact, type)}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedView style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[
                  styles.codeInput,
                  {
                    borderColor: digit ? Colors[colorScheme ?? 'light'].tint : '#E0E0E0',
                    color: Colors[colorScheme ?? 'light'].text,
                  },
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
              />
            ))}
          </ThemedView>

          <TouchableOpacity
            style={[
              styles.verifyButton,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].tint,
                opacity: isLoading ? 0.7 : 1,
              },
            ]}
            onPress={handleVerifyCode}
            disabled={isLoading || code.some(digit => !digit)}
          >
            {isLoading ? (
              <ThemedText style={styles.buttonText}>{t('auth.verifying')}</ThemedText>
            ) : (
              <>
                <IconSymbol name="checkmark.circle.fill" size={20} color="white" />
                <ThemedText style={styles.buttonText}>{t('auth.verifyCode')}</ThemedText>
              </>
            )}
          </TouchableOpacity>

          <ThemedView style={styles.resendContainer}>
            <ThemedText style={styles.resendText}>
              {t('auth.didntReceiveCode')}{' '}
            </ThemedText>
            <TouchableOpacity
              onPress={handleResendCode}
              disabled={timeLeft > 0 || isLoading}
            >
              <ThemedText style={[
                styles.resendButton,
                { 
                  color: timeLeft > 0 ? Colors[colorScheme ?? 'light'].tabIconDefault : Colors[colorScheme ?? 'light'].tint,
                }
              ]}>
                {timeLeft > 0 ? `${t('auth.resendCode')} (${timeLeft}s)` : t('auth.resendCode')}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
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
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
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
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
    opacity: 0.7,
  },
  resendButton: {
    fontSize: 14,
    fontWeight: '600',
  },
});
