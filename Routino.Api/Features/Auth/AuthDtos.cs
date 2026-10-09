namespace Routino.Api.Features.Auth;

public sealed record OtpRequestDto(string Mobile);

public sealed record OtpVerifyDto(string Mobile, string Code);

public sealed record UserDto(Guid Id, string Mobile, DateTime CreatedAt);

public sealed record AuthResponseDto(string Token, UserDto User);
