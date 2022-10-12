import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import Image from 'next/image';

import { useAtom } from 'jotai';

import moment from 'moment';

import { CloseIcon } from '@components/icons/close-icon';

import calendarIcon from '@assets/datePickerAssets/akar-icons_calendar.svg';
import arrowDown from '@assets/datePickerAssets/arrow-down.svg';
import arrowLeft from '@assets/datePickerAssets/arrow-left.svg';
import arrowRigth from '@assets/datePickerAssets/arrow-rigth.svg';
import { startDateAtom } from '@contexts/dashboard';
import { endDateAtom } from '@contexts/dashboard';
import { format, getMonth, getYear } from 'date-fns';
import { range } from 'lodash';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useAtom(startDateAtom);
  const [endDate, setEndDate] = useAtom(endDateAtom);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(
      moment(startDate).format('YYYY-DD-MM') !== '2020-01-01' ||
        moment(endDate).format('YYYY-DD-MM') !== moment().format('YYYY-DD-MM')
    );
  }, [startDate, endDate]);

  const [year, setYear] = useState(getYear(startDate));

  const [selectDateYearFrom, setSelectDateYearFrom] = useState(false);
  const [selectDateMonthFrom, setSelectDateMonthFrom] = useState(false);
  const [selectDateYearTo, setSelectDateYearTo] = useState(false);
  const [selectDateMonthTo, setSelectDateMonthTo] = useState(false);

  const [years, setYears] = useState(range(year, year + 12, 1));

  // States for params range of "years", 12 years at a time,
  const [firstParamRange, setFirstParamRange] = useState(year);
  const [secondParamRange, setSecondParamRange] = useState(year + 12);

  function handleResetDatePicker() {
    setStartDate(new Date('2020-01-01'));
    setEndDate(new Date());
  }

  // Function set in intervals of 12 so that it keeps rendering the same range
  function hadleClickYearSubtraction() {
    setFirstParamRange(firstParamRange - 12);
    setSecondParamRange(secondParamRange - 12);
  }

  function hadleClickYearAddition() {
    setFirstParamRange(firstParamRange + 12);
    setSecondParamRange(secondParamRange + 12);
  }

  useEffect(() => {
    setYears(range(firstParamRange, secondParamRange, 1));
  }, [secondParamRange]);

  useEffect(() => {
    if (startDate > endDate) setStartDate(endDate);
  }, [endDate]);

  useEffect(() => {
    if (startDate > endDate) setEndDate(startDate);
  }, [startDate]);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <div className='flex h-11 w-full content-center justify-end'>
      <div
        className={`flex w-full max-w-[300px] content-center items-center rounded-lg border bg-white p-3 ${
          isSelected ? 'border-1 border-[#1C8C64]' : ''
        }`}
      >
        <div className='ml-2 mr-3 flex items-center'>
          <Image src={calendarIcon} alt='Calendar Icon' />
        </div>
        <div className='relative mx-1 text-xs'>From</div>
        <div className='relative w-40 text-gray-500'>
          <DatePicker
            fixedHeight
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            dateFormat='dd/MM/yyyy'
            value={startDate}
            startDate={startDate}
            endDate={endDate}
            nextMonthButtonLabel='>'
            previousMonthButtonLabel='<'
            popperClassName='react-datepicker-left'
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              prevYearButtonDisabled,
              nextMonthButtonDisabled,
              nextYearButtonDisabled,
            }) => (
              <div className='flex items-center justify-evenly px-2 py-2'>
                {/* Conditional to change button in the header. to change months or years depending on current selection state */}
                {selectDateYearFrom ? (
                  <button
                    onClick={hadleClickYearSubtraction}
                    disabled={prevYearButtonDisabled}
                    type='button'
                    className={`${
                      prevYearButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex bg-white p-1 text-sm font-medium text-gray-700  
                    hover:bg-gray-50 focus:outline-none 
                    focus:ring-2 focus:ring-offset-0 `}
                  >
                    <div className='my-3 ml-2 mr-3'>
                      <Image src={arrowLeft} alt='Left Arrow' />
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type='button'
                    className={`${
                      prevYearButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex bg-white p-1 text-sm font-medium text-gray-700  
                    hover:bg-gray-50 focus:outline-none 
                    focus:ring-2 focus:ring-offset-0 `}
                  >
                    <div className='my-3 ml-2 mr-3'>
                      <Image src={arrowLeft} alt='Left Arrow' />
                    </div>
                  </button>
                )}

                <div>
                  <span className='fex-row flex  h-full justify-end text-lg text-gray-700'>
                    {selectDateYearFrom
                      ? years[0] + '-' + years[11]
                      : format(date, 'MMMM, yyyy')}
                    {!selectDateYearFrom && !selectDateMonthFrom ? (
                      <button
                        onClick={() => {
                          setYear(getYear(date) - 6),
                            setYears(
                              range(getYear(date), getYear(date) + 12, 1)
                            );
                          setSelectDateYearFrom(!selectDateYearFrom);
                        }}
                      >
                        <div className='ml-2 -mt-1'>
                          <Image src={arrowDown} alt='Arrow down' />
                        </div>
                      </button>
                    ) : (
                      <button
                        disabled
                        onChange={() => {
                          setYear(getYear(date) - 6);
                        }}
                        onClick={() => {
                          setYear(getYear(date) - 6),
                            setSelectDateYearFrom(!selectDateYearFrom);
                        }}
                      >
                        <div className='ml-2 -mt-1 '>
                          <Image src={arrowDown} alt='Arrow down' />
                        </div>
                      </button>
                    )}

                    {/* Conditional to render Year selection component */}
                    {selectDateYearFrom ? (
                      <>
                        <div
                          className='absolute inset-x-0 bottom-0 right-0 z-30 m-1 grid h-[16rem] w-auto transform-none
                           grid-cols-3 bg-white px-10 text-sm'
                        >
                          {years.map((option) => (
                            <div
                              key={option}
                              className={`m-2 flex cursor-pointer items-center justify-center rounded-lg transition ease-in-out hover:bg-[#E7E7E7] ${
                                getYear(date) === option
                                  ? 'bg-[#1C8C64] text-white'
                                  : ''
                              }`}
                              onClick={() => {
                                changeYear(option),
                                  setSelectDateMonthFrom(!selectDateMonthFrom),
                                  setSelectDateYearFrom(!selectDateYearFrom);
                              }}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}

                    {/* Conditional to render month selection component */}
                    {selectDateMonthFrom ? (
                      <>
                        <div
                          className='absolute inset-x-0 bottom-0 right-0 z-30 m-1 grid h-[16rem] w-auto transform-none
                            grid-cols-3 bg-white px-10 text-sm'
                        >
                          {months.map((option) => (
                            <div
                              key={option}
                              className={`m-2 flex cursor-pointer items-center justify-center rounded-lg transition ease-in-out hover:bg-[#E7E7E7] ${
                                getMonth(date) === months.indexOf(option)
                                  ? 'bg-[#1C8C64] text-white'
                                  : ''
                              }`}
                              onClick={() => {
                                changeMonth(months.indexOf(option)),
                                  setSelectDateYearFrom(false);
                                setSelectDateMonthFrom(!selectDateMonthFrom);
                              }}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                  </span>
                </div>

                {/* Conditional to change button in the header. to change months or years depending on current selection state */}
                {selectDateYearFrom ? (
                  <button
                    onClick={hadleClickYearAddition}
                    disabled={nextYearButtonDisabled}
                    type='button'
                    className={`${
                      nextYearButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex bg-white p-1 text-sm font-medium text-gray-700  
                    hover:bg-gray-50 focus:outline-none 
                    focus:ring-2 focus:ring-offset-0 `}
                  >
                    <div className='my-3 ml-2 mr-3'>
                      <Image src={arrowRigth} alt='Rigth Arrow' />
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type='button'
                    className={`${
                      nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex bg-white p-1 text-sm font-medium text-gray-700 
                    shadow-sm hover:bg-gray-50 focus:outline-none 
                    focus:ring-2 focus:ring-offset-0 `}
                  >
                    <div className='my-3 ml-2 mr-3'>
                      <Image src={arrowRigth} alt='Rigth Arrow' />
                    </div>
                  </button>
                )}
              </div>
            )}
          />
        </div>
        <div className='relative mx-1 text-xs'>To</div>

        <div className='relative w-40 text-gray-500'>
          <DatePicker
            fixedHeight
            selected={endDate}
            dateFormat='dd/MM/yyyy'
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            nextMonthButtonLabel='>'
            previousMonthButtonLabel='<'
            popperClassName='react-datepicker-right'
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
              prevYearButtonDisabled,
              nextYearButtonDisabled,
            }) => (
              <div className='flex items-center justify-evenly px-2 py-2'>
                {/* Conditional to change button in the header. to change months or years depending on current selection state */}
                {selectDateYearTo ? (
                  <button
                    onClick={hadleClickYearSubtraction}
                    disabled={prevYearButtonDisabled}
                    type='button'
                    className={`${
                      prevYearButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex bg-white p-1 text-sm font-medium text-gray-700  
                    hover:bg-gray-50 focus:outline-none 
                    focus:ring-2 focus:ring-offset-0 `}
                  >
                    <div className='my-3 ml-2 mr-3'>
                      <Image src={arrowLeft} alt='Left Arrow' />
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type='button'
                    className={`${
                      prevYearButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex bg-white p-1 text-sm font-medium text-gray-700  
                    hover:bg-gray-50 focus:outline-none 
                    focus:ring-2 focus:ring-offset-0 `}
                  >
                    <div className='my-3 ml-2 mr-3'>
                      <Image src={arrowLeft} alt='Left Arrow' />
                    </div>
                  </button>
                )}

                <span className='fex-row flex  h-full justify-end text-lg text-gray-700'>
                  {selectDateYearTo
                    ? years[0] + '-' + years[11]
                    : format(date, 'MMMM, yyyy')}
                  {!selectDateYearTo && !selectDateMonthTo ? (
                    <button
                      onClick={() => {
                        setYear(getYear(date) - 6),
                          setYears(range(getYear(date), getYear(date) + 12, 1));
                        setSelectDateYearTo(!selectDateYearTo);
                      }}
                    >
                      <div className='ml-2 -mt-1'>
                        <Image src={arrowDown} alt='Arrow down' />
                      </div>
                    </button>
                  ) : (
                    <button
                      disabled
                      onChange={() => {
                        setYear(getYear(date) - 6);
                      }}
                      onClick={() => {
                        setYear(getYear(date) - 6),
                          setSelectDateYearTo(!selectDateYearFrom);
                      }}
                    >
                      <div className='ml-2 -mt-1 '>
                        <Image src={arrowDown} alt='Arrow down' />
                      </div>
                    </button>
                  )}

                  {/* Conditional to render Year selection component */}
                  {selectDateYearTo ? (
                    <>
                      <div
                        className='absolute inset-x-0 bottom-0 right-0 z-30 m-1 grid h-[16rem] w-auto transform-none
                           grid-cols-3 bg-white px-10 text-sm'
                      >
                        {years.map((option) => (
                          <div
                            key={option}
                            className={`m-2 flex cursor-pointer items-center justify-center rounded-lg transition ease-in-out hover:bg-[#E7E7E7] ${
                              getYear(date) === option
                                ? 'bg-[#1C8C64] text-white'
                                : ''
                            }`}
                            onClick={() => {
                              changeYear(option),
                                setSelectDateMonthTo(!selectDateMonthTo),
                                setSelectDateYearTo(!selectDateYearTo);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {/* Conditional to render month selection component */}
                  {selectDateMonthTo ? (
                    <>
                      <div
                        className='absolute inset-x-0 bottom-0 right-0 z-30 m-1 grid h-[16rem] w-auto transform-none
                            grid-cols-3 bg-white px-10 text-sm'
                      >
                        {months.map((option) => (
                          <div
                            key={option}
                            className={`m-2 flex cursor-pointer items-center justify-center rounded-lg transition ease-in-out hover:bg-[#E7E7E7] ${
                              getMonth(date) === months.indexOf(option)
                                ? 'bg-[#1C8C64] text-white'
                                : ''
                            }`}
                            onClick={() => {
                              changeMonth(months.indexOf(option)),
                                setSelectDateYearTo(false);
                              setSelectDateMonthTo(!selectDateMonthTo);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </span>

                {/* Conditional to change button in the header. to change months or years depending on current selection state */}
                {selectDateYearTo ? (
                  <button
                    onClick={hadleClickYearAddition}
                    disabled={nextYearButtonDisabled}
                    type='button'
                    className={`${
                      nextYearButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex bg-white p-1 text-sm font-medium text-gray-700  
                    hover:bg-gray-50 focus:outline-none 
                    focus:ring-2 focus:ring-offset-0 `}
                  >
                    <div className='my-3 ml-2 mr-3'>
                      <Image src={arrowRigth} alt='Rigth Arrow' />
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type='button'
                    className={`${
                      nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'
                    }
                    inline-flex bg-white p-1 text-sm font-medium text-gray-700 
                    shadow-sm hover:bg-gray-50 focus:outline-none 
                    focus:ring-2 focus:ring-offset-0 `}
                  >
                    <div className='my-3 ml-2 mr-3'>
                      <Image src={arrowRigth} alt='Rigth Arrow' />
                    </div>
                  </button>
                )}
              </div>
            )}
          />
        </div>
        {isSelected && (
          <div className='relative mx-1 text-xs'>
            <span onClick={handleResetDatePicker}>
              <CloseIcon width='18' />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
