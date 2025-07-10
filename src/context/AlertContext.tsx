// // import { createContext, useContext, useState } from 'react';



// // type AlertContextType = {
// //     message: string | null;
// //     severity: 'success' | 'error' | 'info' | 'warning';
// //     showMessage: (msg: string, severity?: AlertContextType['severity']) => void;
// //     clearMessage: () => void;
// // };

// // const AlertContext = createContext<AlertContextType | undefined>(undefined);

// // export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
// //     const [message, setMessage] = useState<string | null>(null);
// //     const [severity, setSeverity] = useState<AlertContextType['severity']>('info');

// //     const showMessage = (msg: string, sev: AlertContextType['severity'] = 'info') => {
// //         setSeverity(sev);
// //         setMessage(msg);
// //     };

// //     const clearMessage = () => setMessage(null);

// //     return (
// //         <AlertContext.Provider value={{ message, severity, showMessage, clearMessage }}>
// //             {children}
// //         </AlertContext.Provider>
// //     );
// // };

// // export const useAlert = () => {
// //     const context = useContext(AlertContext);
// //     if (!context) throw new Error('useAlert must be used inside AlertProvider');
// //     return context;
// // };


// // src/context/AlertContext.tsx
// import { createContext, useContext, useState } from 'react';
// import { Snackbar, Alert, type AlertColor } from '@mui/material';

// type AlertContextType = {
//     showAlert: (message: string, severity?: AlertColor) => void;
// };

// const AlertContext = createContext<AlertContextType | undefined>(undefined);


// export const useAlert = () => {
//     const ctx = useContext(AlertContext);
//     if (!ctx) throw new Error('useAlert must be used within AlertProvider');
//     return ctx.showAlert;
// };



// export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
//     const [alert, setAlert] = useState<{ msg: string; severity: AlertColor } | null>(null);

//     const showAlert = (msg: string, severity: AlertColor = 'info') => {
//         setAlert({ msg, severity });
//     };


//     const handleClose = () => setAlert(null);

//     return (
//         <AlertContext.Provider value={{ showAlert }}>
//             {children}
//             <Snackbar open={!!alert} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//                 {alert &&
//                     <Alert onClose={handleClose} severity={alert.severity} variant="filled">
//                         {alert.msg}
//                     </Alert>
//                 }
//             </Snackbar>
//         </AlertContext.Provider>
//     );
// };
