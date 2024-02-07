import { ComponentPropsWithoutRef, FC, useState } from 'react';
import ReactMultiDatePicker, { DateObject } from 'react-multi-date-picker';

import { Typography } from '@/shared/ui/typography';
import { Trans } from '@/widgets/Trans/Trans';
import { clsx } from 'clsx';
import Link from 'next/link';
import InputIcon from 'react-multi-date-picker/components/input_icon';

import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';

import s from './datePicker.module.scss';

export type DatePickerProps = ComponentPropsWithoutRef<typeof ReactMultiDatePicker> & {
  calendarError?: string;
  inputError?: string;
  label?: string;
};

export const DatePicker: FC<DatePickerProps> = ({
  calendarError,
  children,
  inputError,
  label,
  onPositionChange,
  ...props
}) => {
  const [calendarErrorPos, setCalendarErrorPos] = useState<'bottom' | 'top'>('top');

  const mapWeekends = ({ date }: { date: DateObject }) => {
    const isWeekend = [0, 6].includes(date.weekDay.index);

    return { className: isWeekend ? 'highlight highlight-red' : '' };
  };

  const handlePositionChange: DatePickerProps['onPositionChange'] = data => {
    const newPos = data.popper.top < data.element.top ? 'bottom' : 'top';

    if (newPos !== calendarErrorPos) {
      setCalendarErrorPos(newPos);
    }
    onPositionChange?.(data);
  };

  const isAnyError = calendarError || inputError;

  return (
    <div className={clsx(s.datePickerContainer, isAnyError && s.error)}>
      <Typography.Regular14 className={s.label} color={'var(--color-light-900)'}>
        {label}
      </Typography.Regular14>
      <ReactMultiDatePicker
        arrow={false}
        className={'bg-dark'}
        containerClassName={s.cont}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        mapDays={mapWeekends}
        monthYearSeparator={' '}
        onPositionChange={handlePositionChange}
        render={<InputIcon />}
        shadow={false}
        weekStartDayIndex={1}
        zIndex={1200}
        {...props}
      >
        {children}
        {calendarError && (
          <Typography.Regular12
            className={clsx(s.formatError, s.errorMessage)}
            component={'p'}
            style={{ ...(calendarErrorPos === 'top' && { order: -1 }) }}
          >
            {calendarError}
          </Typography.Regular12>
        )}
      </ReactMultiDatePicker>

      {inputError && (
        <Typography.Regular12 className={s.errorMessage}>
          <Trans
            tags={{
              link: ({ content }) => (
                <Link href={'/privacy-policy'} style={{ textDecoration: 'underLine' }}>
                  {content}
                </Link>
              ),
            }}
            text={inputError}
          />
        </Typography.Regular12>
      )}
    </div>
  );
};
