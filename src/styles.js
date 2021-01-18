import {makeStyles, createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#6fc4bc',
            main: '#4CB6AC',
            dark: '#357f78',
            contrastText: '#fff',
        },
    },
});

export const useStyles = makeStyles((theme) => ({
    pageWrapper: {
        marginTop: 20,
        width: 300,
    },

    widgetCard: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        minHeight: 200,
        background: '#fffcfc',
        borderTop: '3px solid #000000',
        borderRadius: 0
    },

    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
    },

    input: {
        width: '100%'
    },

    currContainer: {
        display: 'flex',
        alignItems: 'center',
    },

    rotateAnimation: {
        transform: 'rotate(-180deg)',
        transition: '300ms'
    },
    swapBtn: {
        color: '#4CB6AC',
    },
    loader: {
        width: 280,
        marginTop: -16,
        marginLeft: -24,
        marginRight: -24,
    },
}));