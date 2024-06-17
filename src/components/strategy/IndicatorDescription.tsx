import React, { useState } from 'react';
import { Stack, Input, Button, Text, Textarea } from '@chakra-ui/react';
import useSignUp from '../../hooks/useSignUp';
import { useMutation } from '@tanstack/react-query';
import Strategy from '../../models/Strategy';
import { StrategiesClient } from '../../services/ApiClientInstances';
import  { useCreateStrategy } from '../../hooks/useCreateStrategy';

interface SignUpProps {
  onClose: () => void;
  description: string;
}

const CreateStratForm: React.FC<SignUpProps> = ({ onClose, description }) => {


  

  return (
 <>
<pre>
  {description}
</pre>

<Button onClick={onClose}>Close</Button>
 </>
  );
};

export default CreateStratForm;
