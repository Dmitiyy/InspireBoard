import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux";
import { setDataDefault } from "../redux/generateReducer";

interface IButton {
  checkbox: boolean;
  activeOption: () => void;
  activeClass?: boolean;
  title: string;
  stepName: string;
}

export const GenerateButton: FC<IButton> = ({
  checkbox, activeOption, activeClass, title, stepName
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [firstOpen, setFirstOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { params, dataList } = useAppSelector(state => state.generate);
  
  useEffect(() => {
    if (active && checkbox) {
      dispatch(setDataDefault({ini: 'dataList', data: [...dataList, title]}));
    } else {
      dispatch(setDataDefault({ini: 'dataList', data: dataList.filter(item => item !== title)}));
    }
  }, [active]);

  useEffect(() => {
    console.log(checkbox);

  }, [checkbox]);

  const handleStep = () => {
    let result: string = title;

    if (checkbox) {
      
      result = dataList.join(',');
    }

    dispatch(setDataDefault({ini: 'params', data: {...params, [stepName]: result}}));
  }
 
  return (
    <button className={
      checkbox && active || !checkbox && activeClass && firstOpen ? 
      "generate__options-active" : ""
    } 
    onClick={() => {
      if (!checkbox) {activeOption()};
      setActive(prev => !prev);
      setFirstOpen(true);
      handleStep();
    }}>
      {
        checkbox && (
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.7234 0.459333C21.3574 0.0920063 20.7573 0.0920063 20.3913 0.459333L9.31098 11.537L3.60464 5.79162C3.23866 5.42295 2.6426 5.42295 2.27393 5.79162L0.274486 7.78971C-0.0914952 8.15435 -0.0914952 8.75445 0.274486 9.12178L8.63957 17.542C9.00555 17.9067 9.60161 17.9067 9.97163 17.542L23.7215 3.79083C24.0928 3.42351 24.0928 2.82206 23.7215 2.45339L21.7234 0.459333Z" fill="white"/>
          </svg>
        )
      }
      <p style={{marginLeft: checkbox ? '-30px' : '0px'}}>
        {title[0].toUpperCase() + title.slice(1, title.length)}
      </p>
    </button>
  )
}