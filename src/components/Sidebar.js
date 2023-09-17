import {Link as ReactRouterLink} from 'react-router-dom';
import { Box, Link } from '@chakra-ui/react';

export default function Sidebar({activeRoute}) {
  return (
    <>
        <Box p="20px">
            {activeRoute==="N" && <Link as={ReactRouterLink} to="/" fontWeight="bold" color="green.500">Notes</Link>}
            {activeRoute!=="N" && <Link as={ReactRouterLink} to="/">Notes</Link>}
            
        </Box>
        <Box p="20px">
        {activeRoute==="C" && <Link as={ReactRouterLink} to="/classes" fontWeight="bold" color="green.500">Classes</Link>}
            {activeRoute!=="C" && <Link as={ReactRouterLink} to="/classes">Classes</Link>}
        </Box>
        <Box p="20px">
        {activeRoute==="I" && <Link as={ReactRouterLink} to="/insights" fontWeight="bold" color="green.500">Insights</Link>}
            {activeRoute!=="I" && <Link as={ReactRouterLink} to="/insights">Insights</Link>}
        </Box>
    </>
    
  )
}
