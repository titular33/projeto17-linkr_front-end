/* export default function tooltipText(quantLikes, isLiked, quantityLikesPost, user) {
    let text = "";
    if(quantityLikesPost === 0) return "Sem curtidas";

    let likesUsers = quantLikes.map(like => {
        return  user;
    });

    if(isLiked) {
        if(quantityLikesPost === 1) return "Você curtiu isso."

        likesUsers = likesUsers.filter(u => u !== user.user.username);
        if(quantityLikesPost === 2) return `Você e ${likesUsers[0]} curtiram isso`;

        text = `Você e ${likesUsers[0]} e outra(s) ${likesUsers.length - 1} pessoa(s) curtiram isso`;
    } else {
        if(quantityLikesPost === 1) return `${likesUsers[0]} curtiu isso.`
        if(quantityLikesPost === 2) return `${likesUsers[0]} e ${likesUsers[1]} curtiram isso.`

        text = `${likesUsers[0]}, ${likesUsers[1]} e outra(s) ${likesUsers.length - 2} pessoa(s) curtiram isso`;
    }

    return text;
} */