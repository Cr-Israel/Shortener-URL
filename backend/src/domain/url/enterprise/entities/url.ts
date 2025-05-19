import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface UrlProps {
    userId: UniqueEntityID
    shortId: string
    original: string
    createdAt: Date
}

export class Url extends Entity<UrlProps> {
    get userId() {
        return this.props.userId
    }

    get shortId() {
        return this.props.shortId
    }

    get original() {
        return this.props.original
    }

    get createdAt() {
        return this.props.createdAt
    }

    static create(
        props: Optional<UrlProps, "createdAt">,
        id?: UniqueEntityID
    ) {
        const url = new Url({
            ...props,
            createdAt: props.createdAt ?? new Date()
        },
            id
        )

        return url
    }
}