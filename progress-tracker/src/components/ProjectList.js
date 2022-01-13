import {useEffect, useState} from "react";
import ProjectLink from "./ProjectLink";
import {Card, CardContent, Fab, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddIcon from '@mui/icons-material/Add';

export default function ProjectList(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        let url = ''
        switch(String(props.userType)){
            case "admin":
                url = "/admin/projects";
                break;
            case "owner":
                url = "/owner/projects";
                break;
            default:
                console.log(props.userType)
        }
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 1, md: 1 }} direction={"row"}>
                {items.map(item => (
                    <Grid item xs={1} sm={1} md={1} marginTop={3}>
                        <Card elevation={0} sx={{minWidth: 275}} style={{backgroundColor: "grey"}}>
                            <CardContent>
                            <ProjectLink name={item.name}
                                     url={'/admin/project/' + item.id}
                                     id={item.id}
                                     changeComponent={props.changeComponent}
                                     changeProject={props.changeProject}>
                            </ProjectLink>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={1} sm={1} md={1} marginTop={3}>
                <Card elevation={0} sx={{minWidth: 275}} style={{backgroundColor: "grey"}}>
                    <CardContent>
                        <Fab color={"primary"} aria-label={"add"} variant={"extended"}>
                            <AddIcon sx={{ mr: 1 }}/>
                            Add new project
                        </Fab>
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
        );
    }
}