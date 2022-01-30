import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

const GlobalAccordion: FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <Accordion ml="5" allowToggle>
      <AccordionItem m="0">
        <h2>
          <AccordionButton m="0">
            <Box flex="1" textAlign="left">
              {label}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default GlobalAccordion;
