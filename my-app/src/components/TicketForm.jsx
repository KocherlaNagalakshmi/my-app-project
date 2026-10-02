import {useState} from "react";
import { 
    Card,
    CardContent,
    CircularProgress,
    Divider,
    AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  MenuItem,
  Alert,
  Stack,
  CssBaseline,
  Button} from "@mui/material";

export default function TicketForm ({onCreate}){
    const[form, setForm] = useState({
        subject: "",
        description : "",
        priority : "medium",
    })

    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        if(form.subject.trim().length < 3) {
            setError("subject must contain atleast 3 char");
            return;
        }
        try {
            setError("");
            await onCreate(form);
            setForm({
                subject: "",
                description : "",
                priority : "medium",
            })
        }
        catch(e) {
            setError(e.message);
        }
    }

    const change = (e) => 
        setForm({...form, 
            [e.target.name]: e.target.value});
    
    return(
        <Card elevation={3}>

        <CardContent>

        <Typography variant="h6" fontWeight= { 700}
         mb = {2} > Create Ticket </Typography>

        <Stack component = "form"
        onSubmit = {submit} 
        spacing = {2}>
        
        <TextField label = "Subject"
         placeholder = "Enter ticket subject" 
         value = {form.subject}
        onChange={(e) => setForm({...form , subject : e.target.value,
        })
    }


    inputProp = {{maxLength : 120 }}
    required
    fullWidth />

    <TextField label = "Description" placeholder="Descripbe tje issue"
    value = {form.description}
    onChange = {(e) =>
         setForm({
            ...form,
            description: e.target.value,
         })
        }
        multiline rows = {4}
        fullWidth />

        <TextField select label = "Priority"
        value={form.priority}
        onChange = {(e) => setForm({
            ...form,
            priority : e.target.value,
        })
    }
    fullWidth
    >
        
            <MenuItem value = "low">Low
            </MenuItem>
            <MenuItem value = "medium" >
            medium
            </MenuItem>
            <MenuItem value = "High"
            >High
            </MenuItem>

</TextField>


{error && <Alert severity="error">{error} </Alert>
}

<Button type = "submit" variant="contained" size = "large" fullWidth >

reate Ticket
</Button>
</Stack>
</CardContent>
</Card>

    );
}