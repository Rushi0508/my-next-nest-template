import {
	endOfMonth,
	endOfWeek,
	endOfYear,
	isWithinInterval,
	startOfMonth,
	startOfWeek,
	startOfYear,
	subMonths,
	subWeeks,
	subYears,
} from 'date-fns';

export const isLastWeek = (date: Date | string): boolean => {
	const lastWeekStart = startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
	const lastWeekEnd = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });

	return isWithinInterval(new Date(date), { start: lastWeekStart, end: lastWeekEnd });
};

export const isLastMonth = (date: Date | string): boolean => {
	const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
	const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));

	return isWithinInterval(new Date(date), { start: lastMonthStart, end: lastMonthEnd });
};

export const isLastYear = (date: Date | string): boolean => {
	const lastYearStart = startOfYear(subYears(new Date(), 1));
	const lastYearEnd = endOfYear(subYears(new Date(), 1));

	return isWithinInterval(new Date(date), { start: lastYearStart, end: lastYearEnd });
};
