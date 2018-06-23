import React, {Component} from 'react';

import {
    Card,
    Grid,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    CircularProgress,
    Chip
} from "@material-ui/core/es/index";

class App extends Component {

    state = {
        loaded: false,
        serverData: []
    };

    componentDidMount() {

        const serverUrl = 'https://api.dailymotion.com/users?fields=id,username,screenname,cover_250_url,avatar_120_url,videos_total,fans_total&list=recommended&limit=20';

        fetch(serverUrl)
            .then((response) => {
                return response.json();
            })
            .then((serverData) => {
                this.setState({
                    loaded: true,
                    serverData: serverData
                });
            });

    }

    static generateLoading() {

        const classes = {
            progress: {
                margin: '200px auto',
                textAlign: 'center'
            }
        };

        return (
            <div style={classes.progress}>
                <CircularProgress/>
                <Typography size={50} gutterBottom variant="headline" component="h2">
                    Please wait...
                </Typography>
            </div>
        );
    }

    generateCards() {

        const classes = {
            grid: {
                padding: '20px'
            },
            card: {
                maxWidth: 345,
            },
            cardMedia: {
                height: 0,
                paddingTop: '56.25%'
            },

        };

        return this.state.serverData.list.map((value) => {
            return (
                <Grid key={value.id} item xs={3} style={classes.grid}>
                    <Card style={classes.card}>
                        <CardMedia
                            style={classes.cardMedia}
                            image={value.avatar_120_url + ""}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                {value.username}
                            </Typography>
                            <Typography component="p">
                                {value.screenname}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Chip color="primary" label={'Fans total: ' + value.fans_total}/>
                            <Chip label={'Videos total: ' + value.videos_total}/>
                        </CardActions>
                    </Card>
                </Grid>
            );
        })
    }

    render() {
        return (
            <Grid container>
                {this.state.loaded ? this.generateCards() : App.generateLoading()}
            </Grid>
        );
    }
}

export default App;
