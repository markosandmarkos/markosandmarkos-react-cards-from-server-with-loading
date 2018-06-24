import React, {Component} from 'react';

import {
    Card,
    Grid,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    CircularProgress,
    Chip, Button
} from "@material-ui/core/es/index";

const classes = {
    progress: {
        margin: '200px auto',
        textAlign: 'center'
    },
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

class App extends Component {

    state = {
        loaded: false,
        serverData: [],
        limit: 5
    };

    loadDataFromServer() {

        const serverUrl = 'https://api.dailymotion.com/users?fields=id,username,screenname,cover_250_url,avatar_120_url,videos_total,fans_total&list=recommended&limit=' + this.state.limit;

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

    componentDidMount() {
        this.loadDataFromServer();
    }

    componentDidUpdate(_, prevState) {
        if (this.state.limit !== prevState.limit && this.state.limit <= 100) {
            this.loadDataFromServer();
        }
    }

    loadMoreHandler = () => {
        console.log(this.state.limit);
        this.setState(oldState => {

            const addLimit = 5;

            if (oldState.limit + addLimit < 50) {
                return {
                    limit: oldState.limit + addLimit
                }
            }

        });
    };

    static generateLoading() {
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
            <div>
                <Grid container>
                    {this.state.loaded ? this.generateCards() : App.generateLoading()}
                    {(this.state.loaded && this.state.limit <= 50) &&
                    <Grid item xs={3} style={classes.grid}>
                        <Button onClick={this.loadMoreHandler} variant="contained" color="secondary">
                            Load More
                        </Button>
                    </Grid>
                    }
                </Grid>
            </div>
        );
    }
}

export default App;
