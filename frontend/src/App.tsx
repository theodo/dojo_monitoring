import { Box } from '@chakra-ui/react';
import Gravity from './components/Gravity';
import StatisticsDrawer from './components/StatisticsDrawer';

function App() {
  return (
    <Box position='relative' width='100vw' height='100vh'>
      <Gravity />
      <Box position='absolute' bottom={4} right={4}>
        <StatisticsDrawer />
      </Box>
    </Box>
  );
}

export default App;
