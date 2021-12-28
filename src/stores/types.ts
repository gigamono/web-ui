type PayloadError = {
    message: string,
}

type Payload<T> = {
    errors?: PayloadError[],
    data?: T,
}

export type {
    Payload
};
