
import useDraftStore from '@/zustland/draftStore';

export default function useDraft() {
    const { Draft } =  useDraftStore();

// submit delete
const onSubmitDelete = (id: number) => {
    console.log(id);
}

  return{Draft, onSubmitDelete}
}