import { Plus } from 'lucide-react';
import { AddKeywordButtonProps } from '../types/translation.type';

export function AddKeywordButton({ onClick }: AddKeywordButtonProps) {
  return <button className="add-keyword-button" onClick={onClick}><Plus aria-hidden="true" />Add Keyword</button>;
}
