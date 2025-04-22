export const generateRandomAvatar = (seed: string) => {
	return `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}&backgroundColor=ffffff&radius=50&glassesProbability=10&hairAccessoriesProbability=30&mouth=happy01,happy02,happy03,happy04,happy05,happy06,happy07,happy08,happy09,happy10,happy11,happy12,happy13,happy14,happy15,happy16,happy17,happy18&eyes=variant02,variant04,variant06,variant08,variant09,variant10,variant11,variant12,variant13,variant14,variant15,variant16,variant17,variant18`;
};

export const enumToText = (enumValue: string): string => {
	const values = enumValue.split('_');
	return values.map((value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).join(' ');
};
