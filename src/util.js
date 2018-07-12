/**
 * Created by luoxinyi on 2018/1/25.
 */

export const getRedirectPath = ({type, avatar}) => {
    // 根据用户信息 返回跳转地址
    // user.type /boss /genius
    // user.avatar /bossinfo /geniusinfo
    let url = (type === 'boss') ? '/boss': '/genius';
    if (!avatar) {
        url += 'info';
    }
    return url
};

export const getChatId = (userId, targetId) => {
    return [userId, targetId].sort().join('_')
}
