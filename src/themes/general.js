import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
    palette: {
        primary: { main: '#4a9a97' },
        secondary: { main: '#e59845' },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2
    },
    typography: {
        useNextVariants: true,
        fontFamily:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
    }
});