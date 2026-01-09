import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Calendar, DateData, LocaleConfig} from 'react-native-calendars';

import {Colors, FontFamily, FontSizes} from '@/theme';

type MarkedDates = Record<string, any>;

const BIOBAC_LOCALE = 'biobac-en';
if (!LocaleConfig.locales[BIOBAC_LOCALE]) {
  LocaleConfig.locales[BIOBAC_LOCALE] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    today: 'Today',
  };
}
LocaleConfig.defaultLocale = BIOBAC_LOCALE;

export type BiobacCalendarProps = {
  value?: string | null; // YYYY-MM-DD
  onChange?: (dateString: string, dateData: DateData) => void;
  minDate?: string;
  maxDate?: string;
  // Only the range [today - pastDaysEnabled, today] is enabled by default.
  // You can override with minDate/maxDate.
  pastDaysEnabled?: number; // default: 10
  disableFuture?: boolean; // default: true
  disablePast?: boolean; // legacy: if pastDaysEnabled is undefined, minDate falls back to today
  markedDates?: MarkedDates;
  containerStyle?: StyleProp<ViewStyle>;
  selectedBgColor?: string;
  selectedTextColor?: string;
};

function toISODate(d: Date) {
  // local date -> YYYY-MM-DD (no timezone shifts)
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function addDaysISO(iso: string, deltaDays: number) {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  date.setDate(date.getDate() + deltaDays);
  return toISODate(date);
}

const Calender = ({
  value,
  onChange,
  minDate,
  maxDate,
  pastDaysEnabled = 10,
  disableFuture = true,
  disablePast = true,
  markedDates,
  containerStyle,
  selectedBgColor = Colors.blue_100,
  selectedTextColor = Colors.blue,
}: BiobacCalendarProps) => {
  const today = useMemo(() => toISODate(new Date()), []);
  const effectiveMinDate =
    minDate ??
    (pastDaysEnabled !== undefined
      ? addDaysISO(today, -pastDaysEnabled)
      : disablePast
        ? today
        : undefined);
  const effectiveMaxDate = maxDate ?? (disableFuture ? today : undefined);

  const [internalValue, setInternalValue] = useState<string | null>(
    value ?? null,
  );
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value ?? null);
    }
  }, [value]);

  const selectedDate = value !== undefined ? value : internalValue;
  const initialDate = selectedDate ?? effectiveMaxDate ?? today;

  const [visibleMonth, setVisibleMonth] = useState<number>(() => {
    if (initialDate) {
      return Number(initialDate.split('-')[1]);
    }
    return new Date().getMonth() + 1;
  });

  const computedMarkedDates: MarkedDates = useMemo(() => {
    const selected =
      selectedDate && selectedDate.length > 0
        ? {
            [selectedDate]: {
              ...(markedDates?.[selectedDate] ?? {}),
              selected: true,
              selectedColor: selectedBgColor,
              selectedTextColor,
            },
          }
        : {};

    return {
      ...(markedDates ?? {}),
      ...selected,
    };
  }, [markedDates, selectedBgColor, selectedDate, selectedTextColor]);

  const handleSelect = useCallback(
    (dateString: string, dateData: DateData) => {
      if (value === undefined) {
        setInternalValue(dateString);
      }
      onChange?.(dateString, dateData);
    },
    [onChange, value],
  );

  const renderDay = useCallback(
    ({date, state}: any) => {
      if (!date) {
        return null;
      }

      const isSelected = selectedDate === date.dateString;
      const isInVisibleMonth = date.month === visibleMonth;
      const isDisabled = state === 'disabled';
      const showDisabledCircle = isDisabled && isInVisibleMonth;
      const isOutsideMonth = !isInVisibleMonth;

      const bgColor = isSelected
        ? selectedBgColor
        : showDisabledCircle
          ? Colors.gray_100
          : 'transparent';

      const textColor = isSelected
        ? selectedTextColor
        : showDisabledCircle || isOutsideMonth
          ? Colors.gray_300
          : Colors.black;

      return (
        <Pressable
          disabled={isDisabled}
          onPress={() =>
            handleSelect(date.dateString, {
              dateString: date.dateString,
              day: date.day,
              month: date.month,
              year: date.year,
              timestamp: date.timestamp,
            })
          }
          style={[styles.dayCell, {backgroundColor: bgColor}]}>
          <Text style={[styles.dayText, {color: textColor}]}>{date.day}</Text>
        </Pressable>
      );
    },
    [handleSelect, selectedBgColor, selectedDate, selectedTextColor, visibleMonth],
  );

  const theme = useMemo(() => {
    const t: any = {
      backgroundColor: Colors.white,
      calendarBackground: Colors.white,
      textSectionTitleColor: Colors.black,
      selectedDayBackgroundColor: selectedBgColor,
      selectedDayTextColor: selectedTextColor,
      todayTextColor: Colors.blue,
      dayTextColor: Colors.black,
      textDisabledColor: Colors.gray_300,
      arrowColor: Colors.black,
      monthTextColor: Colors.black,
      textDayFontFamily: FontFamily.medium,
      textMonthFontFamily: FontFamily.semiBold,
      textDayHeaderFontFamily: FontFamily.semiBold,
      textDayFontSize: FontSizes.medium,
      textMonthFontSize: FontSizes.xlarge,
      textDayHeaderFontSize: FontSizes.small,
      'stylesheet.calendar.header': {
        header: {
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: Colors.gray_200,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        monthText: {
          fontFamily: FontFamily.semiBold,
          fontSize: FontSizes.xlarge,
          color: Colors.black,
        },
        week: {
          marginTop: 12,
          marginBottom: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        },
        dayHeader: {
          fontFamily: FontFamily.semiBold,
          fontSize: FontSizes.medium,
          color: Colors.blue,
          textAlign: 'center',
          width: 30,
        },
      },
      'stylesheet.calendar.main': {
        week: {
            width: '95%',
            alignSelf: 'center',
          marginVertical: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
        //   paddingHorizontal: 16,
        },
      },
    };
    return t;
  }, [selectedBgColor, selectedTextColor]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Calendar
        disableAllTouchEventsForDisabledDays
        firstDay={0}
        initialDate={initialDate}
        minDate={effectiveMinDate}
        maxDate={effectiveMaxDate}
        markedDates={computedMarkedDates}
        onMonthChange={m => setVisibleMonth(m.month)}
        dayComponent={renderDay}
        theme={theme}
        style={styles.calendar}
      />
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  container: {
    width: '93%',
    height: 400,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  calendar: {
    backgroundColor: Colors.white,
  },
  dayCell: {
    width: 30,
    height: 30,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dayText: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.medium,
  },
});

