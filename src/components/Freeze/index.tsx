import FreezeInfo from './FreezeInfo';
import {Box} from '@/components/ui/box';
import {FreezeStyles} from './freezestyles';
const Freeze = () => {
  return (
    <Box style={FreezeStyles.frozenSection}>
      <FreezeInfo />
    </Box>
  );
};

export default Freeze;
