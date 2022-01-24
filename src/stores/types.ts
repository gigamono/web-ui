// Copyright 2022 the Gigamono authors. All rights reserved. GPL-3.0 License.

type PayloadError = {
	message: string;
};

type Payload<T> = {
	errors?: PayloadError[];
	data?: T;
};

export type { Payload };
