import { Amplify, I18n } from 'aws-amplify'
import { translations } from '@aws-amplify/ui-react'
import awsConfig from '../src/aws-exports'

Amplify.configure(awsConfig)

/*
I18n.putVocabularies(translations);
I18n.setLanguage('ja');

I18n.putVocabulariesForLanguage('ja', {
    'Your passwords must match': 'パスワードが一致していません',
    'User does not exist.': 'ユーザーが存在しません',
    'Incorrect username or password.': 'ユーザー名またはパスワードが違います',
    'User is not confirmed.': 'ユーザーは検証されていません',
    'User already exists': 'ユーザーは既に存在します',
    'Invalid verification code provided, please try again.': '指定された確認コードが無効です。もう一度お試しください',
    'Invalid password format': 'パスワードのフォーマットが不正です',
    'Account recovery requires verified contact information': 'アカウントの復元には確認済みの連絡先情報が必要です',
    'Invalid phone number format': '不正な電話番号フォーマットです。 電話番号は次のフォーマットで入力してください: +12345678900',
    'An account with the given email already exists.': 'そのメールアドレスは既に存在します',
    'Username cannot be empty': 'ユーザー名は必須です',
    'Password attempts exceeded': 'パスワード試行回数が超過しました',
    'Attempt limit exceeded, please try after some time.': '試行制限を超過しました。しばらくしてからもう一度お試しください',
    'Username/client id combination not found.': 'ユーザーが存在しません',
    'CUSTOM_AUTH is not enabled for the client.': 'パスワードは必須です',
    'Password did not conform with policy: Password not long enough': 'パスワードは8文字以上を入力してください (8文字以上の大文字小文字を含む英数字)',
    'Password did not conform with policy: Password must have uppercase characters': 'パスワードには大文字を含めてください (8文字以上の大文字小文字を含む英数字)',
    'Password did not conform with policy: Password must have lowercase characters': 'パスワードには小文字を含めてください (8文字以上の大文字小文字を含む英数字)',
    'Password did not conform with policy: Password must have numeric characters': 'パスワードには数字を含めてください (8文字以上の大文字小文字を含む英数字)',
    "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6": 'パスワードは8文字以上、大文字小文字を含む英数字を指定してください',
    "2 validation errors detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6; Value at 'password' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\S]+.*[\S]+$": 'パスワードは8文字以上、大文字小文字を含む英数字を指定してください',
    'Email cannot be empty': 'メールアドレスが入力されていません',
    'Phone number cannot be empty': '電話番号が入力されていません',
    'Password cannot be empty': 'パスワードが入力されていません',
    'Confirmation code cannot be empty': '認証コードが入力されていません',
    'Error creating account': 'アカウント作成時のエラーが発生しました',
    'Network Error': 'ネットワークエラーが発生しました',
    'Please use your credentials to sign in': '認証情報を使ってログインしてください',
    'Custom auth lambda trigger is not configured for the user pool.': 'パスワードが入力されていません',
    'Send code': 'コードを送信する'
  })
  */