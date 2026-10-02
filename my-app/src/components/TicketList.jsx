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
  CssBaseline} from "@mui/material";

  const priorityColor = {
    low : " success",
    medium : "warning",
    high : "error",
    urgent : "error",
  }
export default function TicketList ({
    tickets,
    loading, 
    onStatus,
}) {
    if(loading) {
        return (
            <Card> 
                <CardContent
sx = {{
    minHeight : 200,
    display : "flex",
    justifyContent: "center",
    alignItems : "center",
}}>
    <Box textAlign = "center">
        <CircularProgress />
        <Typography sx = {{mt : 2}} >
            Loading tickets...
        </Typography>
    </Box>
                </CardContent>
            </Card>
        )
    }
    if(!tickets.length) {
    return(
        <Card>

            <CardContent sx = {{
                 minHeight : 250,
             display : "flex",
             flexDirection : "column",
             justifyContent: "center",
             alignItems : "center",
             }} >
                <Typography variant="h6">
                    No Tickets found
                </Typography>
             </CardContent>
        </Card>
    );
}
        <div className = "card">
            <div className = "list-title">
                <div>
                    <h2> support ticket </h2>
                    <p> Mangae customer issues </p>

                </div>
                <span className = "count"> {tickets.length} </span>

            </div>

            {tickets.map((ticket) => (
                <div className="ticket" key = {ticket.id}>
                    <div className="ticket-info"> 
                    <h3>  {ticket.subject} </h3>
                    <p> {ticket.description || "No description"} </p>
                    <small> {ticket.id} </small>
                    </div>

                    <span className = {`badge ${ticket.priority}`}>
                        {ticket.priority}

                    </span>

                    <select value = {ticket.status}
                    onChange = {(e) => onStatus(ticket.id, e.target.value)} >

                        
                        
                        <option value = "open" > Open
                        </option>
                        <option value = "inprogres"> In Progress
                        </option>

                        <option value = "resolved" > resolved 
                        </option>
                        <option value = "closed">closed
                        </option>
                    </select>
                </div>
            ) ) }
        </div>
    

}