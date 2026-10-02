import React , {useState, useEffect} from "react";
import { AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  MenuItem,
  Alert,
  CssBaseline} from "@mui/material";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import Pagination from "./components/Pagination";

import { getTickets,
        createTicket,
        updateStatus,
} from "./services/api";
export default function App () {
const [tickets, setTickets ] = useState([]);
const[search, setSearch ] = useState("");
const [status, setStatus] = useState("");
const [page , setPage ] = useState(1);
const[meta, setMeta] = useState({});
const [loading, setLoading ] = useState(false);
const [error, setError] = useState("");

const loadTickets = async () => {
try{
  setLoading(true);
  setError("");
  const result = await getTickets({
    page,
    pageSize : 10,
    search,
    status,
  });
  setTickets(result.data || []);
  setMeta(result.meta || {});
}catch(e) {
  setError(e.message);
} finally {
  setLoading (false);
}
}

useEffect(() => {
  const timer = setTimeout(loadTickets, 400);
  return() => 
    clearTimeout(timer);
  },[search,status, page]);
  

const create = async(data) => {
  try{
    setError("");
    await createTicket(data);
    setPage(1);
    await loadTickets();
  }catch(e) {
    setError(e.message);
  }
}

const changeStatus = async (id , value) => {
  try{
    setError("");
    await updateStatus(id, value);
    await loadTickets();
  }catch(e) {
    setError(e.message);
  }
  
}
return(
  <div>
  <CssBaseline />
  <Box sx = {{minHeight : "100vh",bgcolor : "#f5f7fb" }}>
    <AppBar position="static" sx = {{background : "linear-gradient(135deg,#172554, #315efb)"
      
    }} > 
      
      <Toolbar>
        <Box sx = {{flexGrow : 1 }}> 
          <Typography variant = "h5" fontWeight = {700} >  HelpDesk
          </Typography>

          <Typography variant = "body2"> Support Ticket Mangement
          </Typography>
</Box>
          <Typography variant="body2"> Agent Dashboard

          </Typography>
        
      </Toolbar>
      </AppBar>


      <Container maxWidth= "xl" sx = {{py: 4}}>
        <Box sx = {{display : "grid", gridTemplateColumns: {
          xs : "1fr",
          sm : "2fr 1fr",
        },
        gap : 2,
        mb : 3,
      }} >

      <TextField fullWidth label = "search ticket" placeholder="search subject or dexcripiton"
      value = {search}
      onChange= {(e) => {
setSearch(e.target.value);
setPage(1);
      }} />

      <TextField select lable = "Status" value = {status} onChange={(e) => {
        setStatus(e.target.value);
        setPage(1);
      }} >
        
        <MenuItem value = ""> All Status </MenuItem>
        <MenuItem value = "open" >Open
         </MenuItem>
         <MenuItem value = "inprogress">
         inprogrss
         </MenuItem>
         
        <MenuItem value = "resolved">
         resolved
         </MenuItem>
         <MenuItem value = "closed">closed
         </MenuItem>
         
      </TextField>

      </Box>

      {error && (
        <Alert severity = "error" onClose = {() => setError("")} sx = {{mb : 3}} >
          {error}
        </Alert>
      )}

      <Box sx = {{display :"grid", gridTemplateColumns: {
        xs:"1fr",
        md : "320px 1fr",
      },
      gap : 3,
      alignItems : "start", }} >
        <TicketForm onCreate={create} />
        <Box>
<TicketList tickets = {tickets} loading = {loading}
      onStatus={changeStatus} />

    <Pagination meta = {meta} setPage={setPage} />
        </Box>
      </Box>

      

      
      
      </Container>
  </Box>
</div>
)

}