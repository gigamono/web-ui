// Copyright 2022 the Gigamono authors. All rights reserved. Apache 2.0 license.

type PayloadError = {
	message: string;
};

type Payload<T> = {
	errors?: PayloadError[];
	data?: T;
};

export type { Payload };
