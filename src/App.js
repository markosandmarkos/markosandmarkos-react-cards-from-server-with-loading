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

    ADD_LIMIT = 10;
    MAX_LIMIT = 50;
    limit = 10;
    state = {
        serverData: []
    };

    loadDataFromServer = () => {

        const serverUrl = 'https://api.dailymotion.com/users?fields=id,username,screenname,cover_250_url,avatar_120_url,videos_total,fans_total&list=recommended&limit=' + this.limit;

        fetch(serverUrl)
            .then((response) => {
                return response.json();
            })
            .then((serverData) => {
                this.setState({
                    serverData: serverData.list
                });
            });
    };

    componentDidMount() {
        this.loadDataFromServer();
    }

    loadMoreHandler = () => {

        if (this.limit + 10 <= this.MAX_LIMIT) {
            this.limit += 10;
            this.loadDataFromServer();
        }

    };

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    {this.state.serverData.length !== 0 ?
                        this.state.serverData.map((value) => {
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
                        : (<div style={classes.progress}>
                            <CircularProgress/>
                            <Typography size={50} gutterBottom variant="headline" component="h2">
                                Please wait...
                            </Typography>
                        </div>)
                    }

                    {(this.state.serverData.length !== 0 && this.limit < this.MAX_LIMIT) ?
                        (<Grid item xs={3} style={classes.grid}>
                            <Button onClick={this.loadMoreHandler} variant="contained" color="secondary">
                                Load More {this.ADD_LIMIT}
                            </Button>
                        </Grid>) : null
                    }
                </Grid>
            </React.Fragment>
        );
    }
}

export default App;
