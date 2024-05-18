export default function formatNumberInEGP(amount: any) {
    const formattedAmount = amount?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
     // Remove the last two zeros
    const trimmedAmount = formattedAmount?.replace(/(\.00)$/, '');
    return `${trimmedAmount} EGP`;
}