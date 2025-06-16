import { Entity } from "@/core/entities/entity";
import { Optional } from "@/core/types/optional";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface UrlProps {
    userId: UniqueEntityID
    shortId: string
    original: string
    expiresAt: Date
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

    get expiresAt() {
        return this.props.expiresAt
    }

    get createdAt() {
        return this.props.createdAt
    }

    static create(
        props: Optional<UrlProps, "createdAt" | "expiresAt">,
        id?: UniqueEntityID
    ) {
        const now = new Date()
        const expiresInMs = 1000 * 60 * 60 * 24 // 24 horas

        const url = new Url({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            expiresAt: props.expiresAt ?? new Date(now.getTime() + expiresInMs)
        },
            id
        )

        return url
    }
}