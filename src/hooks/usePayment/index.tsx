import {useState} from 'react';

export default function usePayment() {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState<string>('');

  // open date picker
  const onOpenDate = () => {
    setShowDate(true);
  };

  // close date picker (used by modal overlay)
  const onCloseDate = () => {
    setShowDate(false);
  };

  // confirm selected date
  const onConfirmDate = (payload: {
    day: number;
    month: number;
    year: number;
    dateString: string;
    timestamp: number;
  }) => {
    const dd = String(payload.day).padStart(2, '0');
    const mm = String(payload.month).padStart(2, '0');
    setDate(`${dd}/${mm}/${payload.year}`);
    console.log('date', date);
    setShowDate(false);
  };

  return {
    date,
    showDate,
    setShowDate,
    onOpenDate,
    onCloseDate,
    onConfirmDate,
  };
}
