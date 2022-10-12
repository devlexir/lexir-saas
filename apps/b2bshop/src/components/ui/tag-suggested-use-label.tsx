import { useModalAction } from '@components/common/modal/modal.context';
import { Tag } from '@framework/basic-rest/types';
import { ROUTES } from '@utils/routes';
import cn from 'classnames';
import { useRouter } from 'next/router';
import CocktailIcon from 'public/assets/images/products/ellipse-icon';

interface Props {
  data: Tag;
  className?: string;
}

const TagSuggestedUseLabel: React.FC<Props> = ({ className, data }) => {
  const { name } = data;
  const router = useRouter();
  const { closeModal } = useModalAction();
  function changeTags() {
    closeModal();
    router.push(ROUTES.SEARCH);
  }
  return (
    <div
      className={cn(
        ' flex h-8 items-center gap-x-2 rounded bg-fill-secondary px-2 py-1 text-13px font-medium transition hover:bg-fill-four md:text-sm',
        className
      )}
      role='button'
      onClick={changeTags}
    >
      {name} <CocktailIcon />
    </div>
  );
};

export default TagSuggestedUseLabel;
