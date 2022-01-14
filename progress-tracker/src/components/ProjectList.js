import {useEffect, useState} from "react";
import ProjectLink from "./ProjectLink";
import Grid from "@mui/material/Grid";
import AddNewProjectModal from "./AddNewProjectModal";

export default function ProjectList(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [numberOfChanges, setNumberOfChanges] = useState(0);

    //const addNumberOfChanges = () => {setNumberOfChanges(numberOfChanges + 1)}

    useEffect(() => {
        let url = "/" + `${props.userType}` + "/projects"
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
    }, [numberOfChanges])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 1, md: 1 }} direction={"row"}>
                {items.map(item => (
                    <ProjectLink name={item.name}
                             url={'/admin/project/' + item.id}
                             id={item.id}
                             changeComponent={props.changeComponent}
                             changeProject={props.changeProject}>
                    </ProjectLink>
                ))}
                <Grid item xs={1} sm={1} md={1} marginTop={3}>
                    <AddNewProjectModal addNumberOfChanges={setNumberOfChanges} numberOfChanges={numberOfChanges}/>
                </Grid>
            </Grid>
        );
    }
}