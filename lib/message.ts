import Toast from 'react-native-toast-message';

export const Message = {
    success: (str: string) => {
        Toast.show({
            type: 'message',
            text1: str,
            visibilityTime: 1000,
            autoHide: true,
            position: 'top',
            props: {
                icon: '🎉'
            }
        });
    },
    info: (str: string) => {
        Toast.show({
            type: 'message',
            text1: str,
            visibilityTime: 1000,
            autoHide: true,
            position: 'top',
            props: {
                icon: '💬'
            }
        });
    },
    error: (str: string) => {
        Toast.show({
            type: 'message',
            text1: str,
            visibilityTime: 1000,
            autoHide: true,
            position: 'top',
            props: {
                icon: '⚠️'
            }
        });
    },
    loading: (str: string) => {
        Toast.show({
            type: 'message',
            text1: str,
            autoHide: false,
            position: 'top',
            props: {
                icon: '⏳'
            }
        });
        return Toast.hide
    }
}