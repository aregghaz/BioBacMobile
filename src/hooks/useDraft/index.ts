
import useDraftStore from '@/zustland/draftStore';

export default function useDraft() {
    const { Draft } =  useDraftStore();
    console.log(Draft);
  return{}
}