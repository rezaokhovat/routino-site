using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Routino.Api.Domain;

namespace Routino.Api.Features.Auth;

public sealed class JwtTokenService(IOptions<JwtOptions> options, IOptions<AdminOptions> admin)
{
    public string Create(User user)
    {
        var settings = options.Value;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.SigningKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddDays(settings.LifetimeDays);
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, user.Mobile),
            new("mobile", user.Mobile),
        };
        if (admin.Value.IsAdmin(user.Mobile))
        {
            claims.Add(new Claim(ClaimTypes.Role, "admin"));
        }

        var token = new JwtSecurityToken(
            settings.Issuer,
            settings.Audience,
            claims,
            expires: expires,
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
