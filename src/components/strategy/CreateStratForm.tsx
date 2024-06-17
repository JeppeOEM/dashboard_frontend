import React, { useState } from 'react';
import { Stack, Input, Button, Text, Textarea } from '@chakra-ui/react';
import useSignUp from '../../hooks/useSignUp';
import { useMutation } from '@tanstack/react-query';
import Strategy from '../../models/Strategy';
import { StrategiesClient } from '../../services/ApiClientInstances';

interface SignUpProps {
  onClose: () => void;
}

const CreateStratForm: React.FC<SignUpProps> = ({ onClose }) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [quote, setQuote] = useState("");

  const descriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const quoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuote(e.target.value);
  };

  const {mutate} = useMutation({
    mutationFn: (newStrategy: Strategy) => StrategiesClient.post(newStrategy)
  })
  

  const handleCreateStrat = async () => {
    if (description && name && quote) {
      const newStrategy = { name, description, quote };
      console.log(newStrategy)
      try {
        mutate(newStrategy);
      } catch (error) {
        console.error('Mutation failed', error);
      }

    //   onClose();
    }
  }

  return (
    <Stack spacing={3}>
      <Input placeholder="Name" onChange={nameChange} />
      <Input placeholder="Quote currency" onChange={quoteChange} />
      <Textarea
        placeholder="Description"
        onChange={descriptionChange}
      />
  
      <Button colorScheme="blue" onClick={handleCreateStrat}>
        Create strategy
      </Button>
    </Stack>
  );
};

export default CreateStratForm;
